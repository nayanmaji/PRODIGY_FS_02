import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: '',
    contactInformation: '',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployee(res.data);
      } catch (err) {
        console.error('Error fetching employee:', err.response?.data || err.message);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.put(`http://localhost:5000/employees/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Employee updated successfully');
      navigate('/employees');
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card bg-custom">
          <div className="card-body">
            <h2 className="card-title text-primary">Edit Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group py-2">
                <label htmlFor="name" className="text-white py-2">Name :</label>
                <input type="text" className="form-control border-primary" id="name" name="name" value={employee.name} onChange={handleChange} />
              </div>
              <div className="form-group py-2">
                <label htmlFor="position" className="text-white py-2">Position :</label>
                <input type="text" className="form-control border-primary" id="position" name="position" value={employee.position} onChange={handleChange} />
              </div>
              <div className="form-group py-2">
                <label htmlFor="department" className="text-white py-2">Department :</label>
                <input type="text" className="form-control border-primary" id="department" name="department" value={employee.department} onChange={handleChange} />
              </div>
              <div className="form-group py-2">
                <label htmlFor="contactInformation" className="text-white py-2">Contact Information :</label>
                <input type="text" className="form-control border-primary" id="contactInformation" name="contactInformation" value={employee.contactInformation} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-success my-2">Update Employee</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
