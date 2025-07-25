const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Bet = require('../models/Bet');
const fetchPrices = require('../utils/priceFetcher');

router.post('/', async (req, res) => {
  try {
    const { username, roundId, multiplier } = req.body;

    if (!username || !roundId || !multiplier)
      return res.status(400).json({ message: 'Missing required fields' });

    const player = await Player.findOne({ username });
    if (!player) return res.status(404).json({ message: 'Player not found' });

    const bet = await Bet.findOne({ playerId: player._id, roundId, cashedOut: false });
    if (!bet) return res.status(400).json({ message: 'No active bet to cash out' });

    const prices = await fetchPrices();
    const currentPrice = prices[bet.currency];

    const payoutCrypto = bet.cryptoAmount * multiplier;
    const payoutUSD = payoutCrypto * currentPrice;

    player.wallet[bet.currency] += payoutCrypto;
    await player.save();

    bet.cashedOut = true;
    bet.status = 'won';
    bet.multiplierAtCashout = multiplier;
    await bet.save();

    res.status(200).json({
      message: 'Cashout successful!',
      payout: {
        crypto: payoutCrypto,
        usd: payoutUSD.toFixed(2),
        currency: bet.currency,
        multiplier
      }
    });
  } catch (err) {
    console.error('❌ Cashout error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
