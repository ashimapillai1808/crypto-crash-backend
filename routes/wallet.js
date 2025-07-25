// routes/wallet.js
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const fetchPrices = require('../utils/priceFetcher');

// GET /wallet/:username
router.get('/:username', async (req, res) => {
  try {
    const player = await Player.findOne({ username: req.params.username });
    if (!player) return res.status(404).json({ message: 'Player not found' });

    const prices = await fetchPrices();
    const usdEquivalent = {
      BTC: player.wallet.BTC * prices.BTC,
      ETH: player.wallet.ETH * prices.ETH,
    };

    res.json({ crypto: player.wallet, usd: usdEquivalent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
