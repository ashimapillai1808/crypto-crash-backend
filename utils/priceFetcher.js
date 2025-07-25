const axios = require('axios');

let cache = {};
let lastFetch = 0;

const fetchPrices = async () => {
  const now = Date.now();
  if (now - lastFetch < 10000 && cache.BTC) return cache;

  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
    );

    cache = {
      BTC: res.data.bitcoin.usd,
      ETH: res.data.ethereum.usd,
    };
  } catch (err) {
    console.warn('⚠️ CoinGecko failed, using mock prices');
    // fallback prices
    cache = {
      BTC: 60000,
      ETH: 3000,
    };
  }

  lastFetch = now;
  return cache;
};

module.exports = fetchPrices;
