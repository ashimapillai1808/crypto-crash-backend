// utils/crashLogic.js
const crypto = require('crypto');

const generateCrashPoint = (seed, roundNumber) => {
  const hash = crypto.createHash('sha256').update(seed + roundNumber).digest('hex');
  const intValue = parseInt(hash.substring(0, 8), 16);
  const maxCrash = 120;
  const crashPoint = (intValue % maxCrash) + 1; // ensures between 1x–120x
  return parseFloat(crashPoint.toFixed(2));
};

module.exports = generateCrashPoint;
