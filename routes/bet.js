const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Bet = require('../models/Bet');
const fetchPrices = require('../utils/priceFetcher');
const crypto = require('crypto');

router.post('/', async (req, res) => {
  try {
    const { username, usdAmount, currency, roundId } = req.body;

    if (!username || !usdAmount || !currency || !roundId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const player = await Player.findOne({ username });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const prices = await fetchPrices();
    const rate = prices[currency];
    const cryptoAmount = usdAmount / rate;

    if (player.wallet[currency] < cryptoAmount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Deduct from wallet
    player.wallet[currency] -= cryptoAmount;
    await player.save();

    const transactionHash = crypto.randomBytes(8).toString('hex');

    const bet = new Bet({
      playerId: player._id,
      usdAmount,
      cryptoAmount,
      currency,
      roundId,
      transactionHash,
      priceAtTime: rate,
    });

    await bet.save();

    res.status(201).json({ message: 'Bet placed!', bet });
  } catch (error) {
    console.error('Error placing bet:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
