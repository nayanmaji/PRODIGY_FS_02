import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalEmployees: 0, recentAdditions: [] });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);


  return (
    <>
      <div className='container py-4'>
        <div className='row'>
          <div className='col'>
            <div className='border'>
              <h2 className='bg-dark text-white p-2'>Dashboard</h2>
              <h4 className='ps-2 py-5'>Total Employees : {stats.totalEmployees}</h4>
            </div>
          </div>

          <div className='col'>
            <div className='border border-dark'>
              <h3 className='p-2 mb-2 bg-dark text-white'>Recent Additions :</h3>
              {stats.recentAdditions.map((employee) => (
                <div className='ps-2 py-1' key={employee._id}>{employee.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
