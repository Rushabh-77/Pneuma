// Dashboard.js
import React, { useState } from 'react';
import BankPage from './bank';
import CreditCardPage from './creditCard';
import './styles.css';  

const Dashboard = () => {
    const [selectedPage, setSelectedPage] = useState('bank');
    
    const handlePageChange = (event) => {
        setSelectedPage(event.target.value);
    };

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            <div className="page-selector">
                <label>
                    <input
                        type="radio"
                        value="bank"
                        checked={selectedPage === 'bank'}
                        onChange={handlePageChange}
                    />
                    Bank Page
                </label>
                <label>
                    <input
                        type="radio"
                        value="creditCard"
                        checked={selectedPage === 'creditCard'}
                        onChange={handlePageChange}
                    />
                    Credit Card Page
                </label>
            </div>

            <div className="page-content">
                {selectedPage === 'bank' && <BankPage />}
                {selectedPage === 'creditCard' && <CreditCardPage />}
            </div>
        </div>
    );
};

export default Dashboard;
