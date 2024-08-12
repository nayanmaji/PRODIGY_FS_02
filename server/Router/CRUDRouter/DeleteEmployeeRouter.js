const Employee = require('../../Model/EmployeeModel');
const authenticate = require('../../Middleware/authenticate');
const express = require('express');
const router = express.Router();

// Delete an employee
router.delete('/employees/:id', authenticate, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;