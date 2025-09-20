require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// connect db
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/uploads', express.static('uploads')); // serve static files

// routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('✅ API working'));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
