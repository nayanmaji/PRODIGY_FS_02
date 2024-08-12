import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in local storage
        const res = await axios.get('http://localhost:5000/employees', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
  <h2 className="mb-4">Employee List</h2>
  <input
    type="text"
    className="form-control mb-4"
    placeholder="Search employees"
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <table className="table table-striped table-bordered">
    <thead className="thead-light">
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Department</th>
        <th>Contact Information</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredEmployees.map((employee) => (
        <tr key={employee._id}>
          <td>{employee.name}</td>
          <td>{employee.position}</td>
          <td>{employee.department}</td>
          <td>{employee.contactInformation}</td>
          <td>
            <Link to={`/edit/${employee._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
            <Link to={`/delete/${employee._id}`} className="btn btn-danger btn-sm ml-2 me-2">Delete</Link>
            <Link to={`/view/${employee._id}`} className="btn btn-info btn-sm ml-2">Details</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default EmployeeList;
