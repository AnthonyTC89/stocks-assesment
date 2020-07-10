const mongoose = require('mongoose');

const { Schema } = mongoose;
const StockSchema = new Schema({
  name: { type: String, required: true, unique: true, minlength: 4 },
  currentPrice: { type: Number, required: true, min: 0 },
  status: { type: Boolean, required: true, default: true },
}, { collection: 'stocks', timestamps: { updatedAt: 'lastUpdate' } });

module.exports = mongoose.model('Stock', StockSchema);
