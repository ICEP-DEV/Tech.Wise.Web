import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminApp from './AdminApp';

const PushNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');
    const [recipient, setRecipient] = useState('driver');

    const handleSend = () => {
        const newNotification = {
            no: notifications.length + 1,
            to: recipient,
            message: message,
            date: new Date().toLocaleString()
        };
        setNotifications([...notifications, newNotification]);
        setMessage('');

        // Show pop-up message
        alert('Notification sent successfully!');
    };
    return (
        <AdminApp>
        <div className="container py-4 mb-5 mt-4">

             <div className="d-flex justify-content-between mb-3">
                <div> <Link to="/adminapp" className="btn btn-outline-primary float-left py- mb-">Back</Link></div>
                {/* <div className="input-group" style={{ maxWidth: '250px' }}>
                    <input type="text" className="form-control form-control-sm" placeholder="Search..." />
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                </div> */}
            </div>
            {/* <h2 className="mb-4 text-dark">Send Push Notifications</h2> */}
            <div className="mb-4">
                <div className="form-group">
                    <h2 className="mb-4 text-dark">Send To*</h2>
                    <select
                        id="recipient"
                        className="form-control"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    >
                        <option value="driver">Driver</option>
                        <option value="rider">Rider</option>
                    </select>
                </div>
                <h2 className="mb-4 py-3 text-dark">Push Message*</h2>
                <div className="form-group">
                    <textarea
                        id="message"
                        className="form-control"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button className="btn btn-primary mt-3" onClick={handleSend}>Send Notification</button>
            </div>

            <h2 className="mb-4 text-dark">Sent Notifications</h2>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Message To</th>
                            <th>Message</th>
                            <th>Date Sent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((notification) => (
                            <tr key={notification.no}>
                                <td>{notification.no}</td>
                                <td>{notification.to}</td>
                                <td>{notification.message}</td>
                                <td>{notification.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </AdminApp>
    );
};

export default PushNotifications;
