# 💸 Crypto Crash Game Backend

This is a backend implementation of a real-time "Crash" game where players bet in USD, converted to crypto using real-time prices (BTC/ETH), and cash out before a random crash occurs.

---

## 🔧 Tech Stack
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Socket.IO** for real-time multiplayer updates
- **CoinGecko API** for crypto price fetching

---

## 🚀 Features

### 🎮 Game Logic
- Round starts every 10s, multiplier increases live
- Random crash point generated with provably fair algorithm
- Players bet in USD, converted to BTC/ETH at real-time price
- Cash out before crash to earn profits
- Lose bet if not cashed out before crash
- Game history and transactions logged in MongoDB

### 💰 Cryptocurrency Integration
- Real-time prices fetched using CoinGecko API
- Wallet system (stores balances in BTC/ETH)
- Transactions simulate blockchain logs
- USD ↔ Crypto conversions handled precisely
- Price caching prevents rate limit issues

### 🌐 WebSockets
- Real-time multiplier updates every 100ms
- Game start/crash/cashout notifications
- Clients can send cashout requests via WebSocket

---

## 📦 Installation

```bash
git clone https://github.com/your-username/crypto-crash-backend.git
cd crypto-crash-backend
npm install
