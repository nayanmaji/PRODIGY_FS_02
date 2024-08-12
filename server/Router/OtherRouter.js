const Employee = require('../Model/EmployeeModel');
const authenticate = require('../Middleware/authenticate');
const express = require('express');
const router = express.Router();


router.get('/dashboard', authenticate, async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const recentAdditions = await Employee.find().sort({ _id: -1 }).limit(5);
        res.json({ totalEmployees, recentAdditions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/employees', authenticate, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;