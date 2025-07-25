
````markdown
# 🚀 Crypto Crash Game Backend

A real-time multiplayer **Crash Game** backend built using **Node.js**, **Express.js**, **MongoDB**, and **Socket.IO**, with live crypto price integration from **CoinGecko API**.

Players bet in USD, watch a multiplier rise, and try to cash out before the game crashes. If they fail, they lose their bet.

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (NoSQL)
- **Real-Time:** Socket.IO (WebSocket)
- **Crypto API:** CoinGecko (real-time BTC/ETH prices)
- **Frontend:** Simple HTML (for testing WebSocket functionality)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/crypto-crash-backend.git
cd crypto-crash-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto-crash
```

### 4. Start the Server

```bash
node server.js
```

Server will run at: [http://localhost:3000](http://localhost:3000)

---

## 📦 API Endpoints

### 🔐 `POST /wallet/create`

Create a new player wallet.

```json
{
  "username": "ashima"
}
```

---

### 💰 `GET /wallet/:username`

Get crypto + USD equivalent balances.

---

### 🎯 `POST /bet`

Place a USD bet, converted to crypto.

```json
{
  "username": "ashima",
  "usdAmount": 10,
  "currency": "BTC",
  "roundId": "round_1"
}
```

---

### 💸 `POST /cashout`

Cash out before crash.

```json
{
  "username": "ashima",
  "roundId": "round_1",
  "multiplier": 2.5
}
```

---

### 📜 `GET /history`

Get list of previous game rounds.

---

## 📡 WebSocket Events (`Socket.IO`)

| Event Name         | Description                      |
| ------------------ | -------------------------------- |
| `newRound`         | Notifies when a new round starts |
| `multiplierUpdate` | Sends multiplier every 100ms     |
| `roundEnd`         | Indicates when round crashes     |

---

## 🧮 Crash Algorithm – Provably Fair

Each round's crash point is generated using:

```js
const hash = sha256(seed + roundNumber);
const crashPoint = 1.1 + (parseInt(hash.slice(0, 8), 16) % 119) / 10;
```

* 🎲 Random but verifiable
* 🔒 Cryptographically secure
* ⚖️ Fair and transparent

---

## 💱 USD ↔ Crypto Conversion

* Prices fetched from **CoinGecko API**
* Price cached for 10s to avoid rate limits
* Example:
  `$10 / $60,000 (BTC) = 0.000166 BTC`

---

## 💾 Sample MongoDB Collections

* `players`: `{ username, wallet: { BTC, ETH } }`
* `bets`: bet details, cashout status, roundId
* `gamerounds`: round history, crash point, timestamps

---

## 🖥️ Frontend Demo (`public/index.html`)

Simple HTML file to:

* View real-time multiplier
* Click to cash out
* Display crash point and round status

---

## ✅ Features Implemented

* [x] Crash Game Logic
* [x] Real-time Crypto Prices
* [x] Socket.IO Multiplayer
* [x] Provably Fair Algorithm
* [x] MongoDB Integration
* [x] WebSocket Client (Test UI)
* [x] Postman Support
* [x] Full CRUD APIs

---

## ✨ Future Enhancements

* 🔐 JWT Authentication
* 💬 Live Player Chat
* 📊 Leaderboard
* 💵 Real blockchain wallet integration
* 🖼️ UI with React or Vue.js

---

## 👩‍💻 Developed By

**Ashima Pillai**
GitHub: [@ashimapillai1808](https://github.com/ashimapillai1808)

---

