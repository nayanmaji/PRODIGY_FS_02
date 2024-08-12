import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: '',
    contactInformation: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/employees', employee, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Employee added successfully');

      // Reset the form fields
      setEmployee({
        name: '',
        position: '',
        department: '',
        contactInformation: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card bg-custom">
          <div className="card-body">
            <h2 className="card-title text-white">Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group py-2">
                <label htmlFor="name" className="text-light py-2">Name:</label>
                <input type="text" className="form-control border-primary" id="name" name="name" value={employee.name} onChange={handleChange} />
              </div>
              <div className="form-group py-2">
                <label htmlFor="position" className="text-light py-2">Position:</label>
                <input type="text" className="form-control border-primary" id="position" name="position" value={employee.position} onChange={handleChange} />
              </div>
              <div className="form-group py-2">
                <label htmlFor="department" className="text-light py-2">Department:</label>
                <input type="text" className="form-control border-primary" id="department" name="department" value={employee.department} onChange={handleChange} />
              </div>
              <div className="form-group py-2">
                <label htmlFor="contactInformation" className="text-light py-2">Contact Information:</label>
                <input type="text" className="form-control border-primary" id="contactInformation" name="contactInformation" value={employee.contactInformation} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-success my-2">Add Employee</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;