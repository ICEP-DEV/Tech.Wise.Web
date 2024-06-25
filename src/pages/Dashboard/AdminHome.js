import React, { useState } from 'react';
import './AdminApp.css'
import {
  BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsPeopleFill, BsFillBellFill
}
  from 'react-icons/bs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';
import AdminApp from './AdminApp';
import { Link } from 'react-router-dom';

function AdminHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const data = [
    {
      name: 'January',
      cancelled: 4000,
      Approved: 2400,
      amt: 2400,
    },
    {
      name: 'February',
      cancelled: 3000,
      Approved: 1398,
      amt: 2210,
    },
    {
      name: 'March',
      cancelled: 2000,
      Approved: 9800,
      amt: 2290,
    },
    {
      name: 'April',
      cancelled: 2780,
      Approved: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      cancelled: 1890,
      Approved: 4800,
      amt: 2181,
    },
    {
      name: 'June',
      cancelled: 2390,
      Approved: 3800,
      amt: 2500,
    },
    {
      name: 'July',
      cancelled: 3490,
      Approved: 4300,
      amt: 2100,
    },];
  // Sample feedback data
  const [feedbackData, setFeedbackData] = useState([
    {
      id: 1,
      name: 'John Sebiya',
      email: 'john.sebiya@example.com',
      comment: 'Great experience using the system!',
      date: '2024-06-01',
      role: 'Customer'
    },
    {
      id: 2,
      name: 'Alice many',
      email: 'alice.many@example.com',
      comment: 'The system needs improvement in terms of user interface.',
      date: '2024-06-02',
      role: 'Driver'
    },
    // Add more feedback objects as needed
  ]);

  // Filtered data based on the search term
  const filteredFeedbackData = feedbackData.filter(feedback =>
    feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.date.includes(searchTerm) ||
    feedback.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminApp>
    <main className='main-container' >
      <div className='main-cards-admin' >
{/* import { Link } from 'react-router-dom';

// ... */}

<div className='card-admin'>
  <Link to={'/trip'} className='text-white text-decoration-none'>
    <div className='card-inner-admin'>
      <h3>Total No Of Trips</h3>
      <BsFillArchiveFill className='card_icon' />
    </div>
    <h1 className='lule'>28</h1>
  </Link>
</div>

<div className='card-admin'>
  <Link to={'/cancelled'} className='text-white text-decoration-none'>
    <div className='card-inner-admin'>
      <h3>Cancelled Trips</h3>
      <BsFillGrid3X3GapFill className='card_icon' />
    </div>
    <h1 className='lule text-black'>3</h1>
  </Link>
</div>

<div className='card-admin'>
  <Link to={'/trip'} className='text-white text-decoration-none'>
    <div className='card-inner-admin'>
      <h3>Completed Trips</h3>
      <BsPeopleFill className='card_icon' />
    </div>
    <h1 className='lule'>25</h1>
  </Link>
</div>

<div className='card-admin'>
  <Link to={'/earnings'} className='text-white text-decoration-none'>
    <div className='card-inner-admin'>
      <h3>Revenue from 3 Trips</h3>
      <BsFillBellFill className='card_icon' />
    </div>
  </Link>


          <h1 className='lule'>R420</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Approved" fill="#8884d8" />
            <Bar dataKey="cancelled" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Approved" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="cancelled" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

      </div>
      <div >
        <main className='main-container col-md-8 mx-md-auto'>
          <div className="container my-5" style={{ backgroundColor: 'white' }}>
            <div className="card-body text-center mt-5">
              <h4 className="card-title text-dark">Recent reviews</h4>
              <p className="card-text text-dark">Click on details for reviewing full feedback</p>
              <div className="input-group" style={{ maxWidth: '250px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-primary" type="button">Search</button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedbackData.map(feedback => (
                    <tr key={feedback.id}>
                      <td>{feedback.id}</td>
                      <td>{feedback.name}</td>
                      <td>{feedback.email}</td>
                      <td>{feedback.comment}</td>
                      <td>{feedback.date}</td>
                      <td>{feedback.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Large modal
        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="card-body text-center">
                <h4 className="card-title">List of active drivers</h4>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-admin col-8 offset-2 my-2 p-3">
                <form>
                  <div className="form-group">
                    <label htmlFor="listname">List name</label>
                    <input type="text" className="form-control" name="listname" id="listname" placeholder="Enter your listname" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="datepicker">Deadline</label>
                    <input type="text" className="form-control" name="datepicker" id="datepicker" placeholder="Pick up a date" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="datepicker">Add a list item</label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Add an item" aria-label="Search for..." />
                      <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button">Go!</button>
                      </span>
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <button type="submit" className="btn btn-block btn-primary">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}
          </div>
        </main>
      </div>



    </main>
    </AdminApp>


  );
}
export default AdminHome;