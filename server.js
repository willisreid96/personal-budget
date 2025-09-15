// Budget API

const express = require('express');
const path = require('path');
const app = express();
const budget = require('./budget.json');
const port = 3000;


app.use('/', express.static('public'));

// API endpoint to get budget data
app.get('/budget', (req, res) => {
    res.json(budget);
});

// Start server
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});