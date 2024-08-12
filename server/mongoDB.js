const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/employee-management-system';

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;