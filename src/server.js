/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
// const path = require('path');

const stockRoutes = require('./Routes/stocks');

// eslint-disable-next-line
const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3001);

// MiddleWares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use(stockRoutes);

// Static Files

// Stating Server
app.listen(app.get('port'), () => {
  console.log(`Server on Port ${app.get('port')}`);
});
