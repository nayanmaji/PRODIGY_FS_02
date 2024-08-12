const Employee = require('../../Model/EmployeeModel');
const authenticate = require('../../Middleware/authenticate');
const express = require('express');
const router = express.Router();

// Create a new employee
router.post('/employees', authenticate, async (req, res) => {
    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.sendStatus(201);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;