const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const historyRoutes = require('./routes/history');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Setup socket AFTER creating server
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});
require('./sockets/gameSocket')(io);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const walletRoutes = require('./routes/wallet');
const betRoutes = require('./routes/bet');
const cashoutRoutes = require('./routes/cashout');

app.use('/wallet', walletRoutes);
app.use('/bet', betRoutes);
app.use('/cashout', cashoutRoutes);
app.use('/history', historyRoutes);


app.get('/', (req, res) => res.send('Crypto Crash Game Backend Running 🚀'));

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
