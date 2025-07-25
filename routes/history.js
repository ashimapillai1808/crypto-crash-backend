// routes/history.js
const express = require('express');
const router = express.Router();
const GameRound = require('../models/GameRound');

// GET /history - Get last 20 game rounds
router.get('/', async (req, res) => {
  try {
    const history = await GameRound.find({})
      .sort({ startTime: -1 })  // latest first
      .limit(20);

    res.status(200).json({ success: true, rounds: history });
  } catch (err) {
    console.error('❌ Error fetching history:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
