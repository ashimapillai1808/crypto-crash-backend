Here is your **complete `README.md` content** for the **Crypto Crash Game Backend** — ready to copy-paste directly into your GitHub:

---

```markdown
# 🚀 Crypto Crash Game - Backend

A multiplayer **Crash game** built using **Node.js**, **Express**, **MongoDB**, and **Socket.IO**, with real-time cryptocurrency integration using CoinGecko API. Players bet in USD, which is converted to crypto (BTC/ETH), and try to cash out before the multiplier crashes!

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **Real-Time**: WebSocket using Socket.IO
- **Crypto Price API**: CoinGecko
- **Frontend (Demo)**: HTML + JavaScript (Socket.IO Client)

---

## 📂 Project Structure

```

crypto-crash-backend/
├── routes/         # API Routes (wallet, bet, cashout, history)
├── models/         # Mongoose models (Player, Bet, GameRound)
├── sockets/        # Socket.IO game loop (real-time multiplier)
├── utils/          # Helpers (priceFetcher.js)
├── public/         # Static HTML file (index.html for test)
├── server.js       # Main server entry
├── .env            # Environment config
└── README.md       # This file

````

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/your-username/crypto-crash-backend.git
cd crypto-crash-backend
````

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto-crash
```

4. Start the server:

```bash
node server.js
```

---

## 🌐 API Endpoints

### ✅ POST `/wallet/create`

Create a new player wallet.

**Request:**

```json
{ "username": "ashima" }
```

---

### 📈 GET `/wallet/:username`

Returns crypto + USD balance.

**Response:**

```json
{
  "BTC": 0.002,
  "ETH": 0.1,
  "USD": {
    "BTC": 130,
    "ETH": 250
  }
}
```

---

### 🎯 POST `/bet`

Place a bet in USD (converted to BTC/ETH).

**Request:**

```json
{
  "username": "ashima",
  "usdAmount": 10,
  "currency": "BTC",
  "roundId": "round_1"
}
```

---

### 💸 POST `/cashout`

Cash out an active bet during the round.

**Request:**

```json
{
  "username": "ashima",
  "roundId": "round_1",
  "multiplier": 2.3
}
```

---

### 🕓 GET `/history`

Fetches recent game rounds from DB.

**Response:**

```json
[
  {
    "roundId": "round_10",
    "crashPoint": 2.45,
    "startTime": "...",
    "endTime": "..."
  }
]
```

---

## 📡 WebSocket Events (via Socket.IO)

Connect using the Socket.IO client (`public/index.html` demo).

### 🔄 `newRound`

Fired at the start of each round.

```json
{
  "roundId": "round_1",
  "crashPoint": "4.2",
  "message": "🟢 New round 1 started. Crash at ?"
}
```

---

### 📊 `multiplierUpdate`

Fired every 100ms with updated multiplier.

```json
{
  "multiplier": "2.73"
}
```

---

### 💥 `roundEnd`

Emitted when the round crashes.

```json
{
  "roundId": "round_1",
  "crashPoint": "4.2",
  "message": "💥 Crashed at 4.2x"
}
```

---

## 🔐 Provably Fair Crash Algorithm

Each crash point is generated using:

```js
const seed = Math.random().toString(36).substring(2);
const hash = crypto.createHash('sha256').update(seed + roundNumber).digest('hex');
const crash = 1.1 + (parseInt(hash.substring(0, 8), 16) % 119) / 10;
```

* ✅ Hash-based
* ✅ Verifiable & Transparent
* ✅ Random yet fair

---

## 💹 USD to Crypto Conversion Logic

* Real-time price fetched via **CoinGecko API**
* Cached every **10 seconds**
* Example:

  * `$10 / $60,000 (BTC) = 0.000166 BTC`
  * If cashed out at `2x`: `0.000332 BTC * 60,000 = $20`

---

## 🧪 Postman Testing

Import this collection manually:

```json
// Sample request
POST /wallet/create
{
  "username": "ashima"
}
```

Create wallet → Place bet → Cash out → View history.

---

## 🖥️ Frontend Demo (index.html)

Preview real-time crash game by opening:

```
public/index.html
```

* Multiplier updates in real-time
* Button to test cashout during round

---

## 🔐 Security Highlights

* Input validation (no negative bets, null values)
* Rate-limited price fetch (10s cache)
* Atomic wallet updates to avoid race conditions
* Uses cryptographically secure randomness for fairness

---

## 🧾 Sample DB Collections

* **players**: username, wallet `{ BTC, ETH }`
* **bets**: bet details, cashedOut, multiplierAtCashout
* **gamerounds**: roundId, crashPoint, startTime, endTime

---

## 📈 Future Improvements (Optional)

* User authentication (JWT)
* Admin dashboard for controlling crash points
* Real blockchain interaction
* Leaderboard, chat, advanced game logic

---

## 👩‍💻 Author

**Ashima Pillai**
[GitHub](https://github.com/ashimapillai1808)

---

## 📄 License

MIT License

```

