const mongoose = require('mongoose');

const gameRoundSchema = new mongoose.Schema({
  roundId: { type: String, required: true, unique: true },
  crashPoint: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameRound', gameRoundSchema);
