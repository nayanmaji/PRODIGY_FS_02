const Employee = require('../../Model/EmployeeModel');
const authenticate = require('../../Middleware/authenticate');
const express = require('express');
const router = express.Router();

// Update an employee
router.put('/employees/:id', authenticate, async (req, res) => {
    console.log('Updating employee with ID:', req.params.id);
    try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!employee) {
        return res.sendStatus(404);
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;