const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    department: String,
    contactInformation: String,
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;