import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillBellFill, BsTrash } from 'react-icons/bs';
import './AdminApp.css';
import { Link } from 'react-router-dom';
import AdminApp from './AdminApp';

function MessagePage() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8085/messages/all');
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const selectMessage = (message) => {
        setSelectedMessage(message);
        if (message.status === 'unread') {
            markMessageAsRead(message.id);
        }
    };

    const markMessageAsRead = async (messageId) => {
        try {
            await axios.put(`http://localhost:8085/messages/${messageId}`);
            setMessages(messages.map(msg => {
                if (msg.id === messageId) {
                    return { ...msg, status: 'read' };
                }
                return msg;
            }));
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:8085/messages/${messageId}`);
            setMessages(messages.filter(message => message.id !== messageId));
            setSelectedMessage(null); // Deselect the message after deletion if it was selected
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <AdminApp>
        <div className="container py- mb-5 mt-">
                <div> <Link to="/adminapp" className="btn btn-outline-primary float-left py- mb-5 mt-5">Back</Link></div>

            <div className="row">
                
                <div className="col-md-3">
                    <div className="card">

                        <div className="card-header">
                            <h5 className="card-title">
                                <BsFillBellFill className="icon me-2" />
                                Inbox
                            </h5>
                        </div>
                        <div className="list-group list-group-flush">
                            {messages.map((message) => (
                                <button
                                    key={message.id}
                                    className={`list-group-item list-group-item-action ${selectedMessage === message ? 'active' : ''} ${message.status === 'unread' ? 'unread' : ''}`}
                                    onClick={() => selectMessage(message)}
                                >
                                    <div className="row">
                                        <div className="col">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">{message.email}</h5>
                                                <small>{message.created_at}</small> {/* If available */}
                                            </div>
                                            <p className="mb-1">{message.subject}</p>
                                            <small className="text-muted">{message.message.substring(0, 50)}...</small>
                                            {message.status === 'unread' && <span className="badge bg-success">U</span>}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    {selectedMessage ? (
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">{selectedMessage.subject}</h5>
                                <div className="d-flex align-items-center">
                                    <span>{selectedMessage.email}</span>
                                    <span className="ms-auto">{selectedMessage.created_at}</span> {/* If available */}
                                    <button
                                        className="btn btn-sm btn-danger ms-3"
                                        onClick={() => deleteMessage(selectedMessage.id)}
                                    >
                                        <BsTrash className="me-1" /> Delete
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>{selectedMessage.message}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Select a message</h5>
                                <p className="card-text">Click on a message to view details.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </AdminApp>
    );
}

export default MessagePage;
