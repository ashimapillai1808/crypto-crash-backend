// models/Bet.js
const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  usdAmount: Number,
  cryptoAmount: Number,
  currency: String,
  multiplierAtCashout: Number,
  roundId: String,
  cashedOut: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'won', 'lost'], default: 'pending' },
  transactionHash: String,
  priceAtTime: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bet', BetSchema);
