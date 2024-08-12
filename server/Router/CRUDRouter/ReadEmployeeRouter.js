const Employee = require('../../Model/EmployeeModel');
const authenticate = require('../../Middleware/authenticate');
const express = require('express');
const router = express.Router();

// Fetch an employee by ID
router.get('/employees/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.sendStatus(404);
    }
    res.json(employee);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;