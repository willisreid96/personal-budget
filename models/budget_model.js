const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    value: { type: Number, required: true },
    color: { type: String, required: true, match: /^#[0-9A-F]{6}$/i },
});

module.exports = mongoose.model('Budget', budgetSchema);