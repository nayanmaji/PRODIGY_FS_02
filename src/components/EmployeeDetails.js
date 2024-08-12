import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const res = await axios.get(`http://localhost:5000/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setEmployee(res.data);
      } catch (err) {
        console.error('Error fetching employee:', err.response?.data || err.message);
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <>
      <div className="container mt-5">
        <div className="card bg-light">
          <div className="card-body">
            <h2 className="card-title">Employee Details</h2>
            <p className="card-text"><strong>Name:</strong> {employee.name}</p>
            <p className="card-text"><strong>Position:</strong> {employee.position}</p>
            <p className="card-text"><strong>Department:</strong> {employee.department}</p>
            <p className="card-text"><strong>Contact Information:</strong> {employee.contactInformation}</p>
            <div className="d-flex justify-content-between">
              <Link to={`/edit/${employee._id}`} className="btn btn-primary">Edit</Link>
              <Link to={`/delete/${employee._id}`} className="btn btn-danger">Delete</Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default EmployeeDetails;
