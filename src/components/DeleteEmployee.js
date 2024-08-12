import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});

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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Employee deleted successfully');
      navigate('/employees');
    } catch (err) {
      console.error('Error deleting employee:', err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="container mt-5 font-monospace">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Are you sure you want to delete this employee?</h2>
            <p className="card-text py-3 ps-2 fs-5"><span className='fw-semibold'>Name : </span> {employee.name}</p>
            <div className="d-flex">
              <button className="btn btn-danger mx-2" onClick={handleDelete}>Yes</button>
              <button className="btn btn-secondary mx-2" onClick={() => navigate('/employees')}>No</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default DeleteEmployee;