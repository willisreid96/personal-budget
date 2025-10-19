// Budget API

const express = require('express');
const path = require('path');
const app = express();
//const budget = require('./budget.json');
const port = 3000;

app.use(express.json());
app.use('/', express.static('public'));

// MongoDB connection

const mongoose = require('mongoose');
const Budget = require('./models/budget_model');

mongoose.connect('mongodb://localhost:27017/personal-budget_db')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

app.get('/api/budgets', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (err) {
        console.error('Error fetching budgets:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/budgets', async (req, res) => {
    try {
        const { title, value, color } = req.body;
        
        // Validate required fields
        if (!title || !value || !color) {
            return res.status(400).json({ 
                error: 'All fields (title, value, color) are required' 
            });
        }

        // Validate color format
        if (!/^#[0-9A-F]{6}$/i.test(color)) {
            return res.status(400).json({ 
                error: '' 
            });
        }

        const newBudget = new Budget({ title, value, color });
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (err) {
        console.error('Error creating budget:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Start server
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});