const mongoose = require('mongoose');
const Budget = require('./models/budget_model');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal-budget_db')
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.log('Error connecting to MongoDB:', err));


const sampleData = [
    { title: "Eat out", value: 85, color: "#FF6384" },
    { title: "Rent", value: 350, color: "#36A2EB" },
    { title: "House", value: 600, color: "#FFCD56" },
    { title: "Grocery", value: 100, color: "#FD6B19" },
    { title: "Gas", value: 60, color: "#AD4EFC" },
    { title: "Entertainment", value: 100, color: "#2ECC71" },
    { title: "Utilities", value: 190, color: "#E74C3C" }
];

async function showDatabase() {
    try {
        // Clear existing data
        await Budget.deleteMany({});
        console.log('Cleared existing budget data');

        // Insert sample data
        const result = await Budget.insertMany(sampleData);
        console.log(`Inserted ${result.length} budget items`);
        
        // Display inserted data
        const budgets = await Budget.find();
        console.log('Budget items in database:');
        budgets.forEach(budget => {
            console.log(`- ${budget.title}: $${budget.value} (${budget.color})`);
        });

        mongoose.connection.close();
        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
}

showDatabase();