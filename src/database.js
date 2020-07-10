/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const USERNAME = process.env.USERNAME_MONGODB;
const PASSWORD = process.env.PASSWORD_MONGODB;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.alsdc.mongodb.net/assesment?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successful connection MongoDB Atlas');
  })
  .catch((err) => {
    console.log('Unsuccessful connection MongoDB Atlas', err);
  });

module.exports = mongoose;
