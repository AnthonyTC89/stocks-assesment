const express = require('express');

const router = express.Router();
const Stock = require('../Models/Stock');

router.get('/api/stocks', async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
});

router.get('/api/stocks/:id', async (req, res) => {
  const { id } = req.params;
  const stock = await Stock.find({ _id: id });
  res.json(stock);
});

router.post('/api/stocks', async (req, res) => {
  const { name, currentPrice } = req.body;
  const stock = new Stock(
    {
      name,
      currentPrice,
    },
  );
  await stock.save();
  res.json(stock);
});

router.put('/api/stocks/:id', async (req, res) => {
  const { name, currentPrice, status } = req.body;
  const newStock = { name, currentPrice, status };
  const { id } = req.params;
  const stock = await Stock.findByIdAndUpdate(id, newStock);
  res.json(stock);
});

router.delete('/api/stocks/:id', async (req, res) => {
  const { id } = req.params;
  await Stock.findByIdAndRemove(id);
  res.json({ status: 'Removed' });
});

module.exports = router;
