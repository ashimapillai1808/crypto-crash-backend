const GameRound = require('../models/GameRound');
const crypto = require('crypto');

let roundNumber = 1;
let gameInProgress = false;
let multiplier = 1;
let crashPoint = 2;

const playersInRound = new Map(); // playerId → bet

function generateCrashPoint() {
  const seed = Math.random().toString(36).substring(2);
  const hash = crypto.createHash('sha256').update(seed + roundNumber).digest('hex');
  const decimal = parseInt(hash.substring(0, 8), 16);
  return (1.1 + (decimal % 119) / 10).toFixed(2); // 1.1x to ~13x
}

function getMultiplier(timeElapsedMs) {
  const growthFactor = 0.0008;
  return (1 + timeElapsedMs * growthFactor).toFixed(2);
}

module.exports = function (io) {
  setInterval(() => {
    if (!gameInProgress) {
      console.log(`🔥 Game loop running: Round ${roundNumber} starting...`);
      gameInProgress = true;
      multiplier = 1;
      crashPoint = generateCrashPoint();
      const startTime = Date.now();

      console.log(`🟢 Round ${roundNumber} started. Crash point will be at ~${crashPoint}x`);

      io.emit('newRound', {
        roundId: `round_${roundNumber}`,
        crashPoint,
        message: `🟢 New round ${roundNumber} started. Crash at ?`
      });

      const interval = setInterval(async () => {
        const timeElapsed = Date.now() - startTime;
        multiplier = getMultiplier(timeElapsed);

        io.emit('multiplierUpdate', { multiplier });
        console.log(`📈 Multiplier: ${multiplier}x`);

        if (parseFloat(multiplier) >= parseFloat(crashPoint)) {
          clearInterval(interval);
          io.emit('roundEnd', {
            roundId: `round_${roundNumber}`,
            crashPoint,
            message: `💥 Crashed at ${crashPoint}x`
          });

          console.log(`💥 Round ${roundNumber} crashed at ${crashPoint}x`);

          // ✅ Save to MongoDB (prevent duplicate)
          const existing = await GameRound.findOne({ roundId: `round_${roundNumber}` });
          if (!existing) {
            await GameRound.create({
              roundId: `round_${roundNumber}`,
              crashPoint: parseFloat(crashPoint),
              startTime: new Date(startTime),
              endTime: new Date()
            });
            console.log(`🗂️ Round ${roundNumber} stored in DB`);
          } else {
            console.log(`⚠️ Round ${roundNumber} already exists in DB. Skipping insert.`);
          }

          gameInProgress = false;
          roundNumber++;
        }
      }, 100); // Update multiplier every 100ms
    }
  }, 10000); // Start new round every 10 seconds
};
