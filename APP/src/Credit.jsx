//STEP 1: Import React and useState
import React, { useState } from 'react';
import { Link } from "react-router-dom";

//STEP 2: Create the component and declare ALL state variables
const Credit = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const [pendingLoans] = useState([
    {
      id: 1,
      name: 'Adeomiwa Comfort',
      amount: 50000,
      bankName: 'First Bank',
      accountNumber: '1234567890',
      creditScore: 720,
      income: 150000,
      status: 'pending'
    },
    {
      id: 2,
      name: 'Tobiloba Asake',
      amount: 75000,
      bankName: 'GTBank',
      accountNumber: '0987654321',
      creditScore: 680,
      income: 200000,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Michael Jackson',
      amount: 30000,
      bankName: 'Access Bank',
      accountNumber: '5678901234',
      creditScore: 550,
      income: 80000,
      status: 'pending'
    }
  ]);

  //STEP 3: Create handler functions
  const [acceptedLoans, setAcceptedLoans] = useState([
    {
      id: 4,
      name: 'Abiola Samuel',
      amount: 60000,
      bankName: 'Zenith Bank',
      accountNumber: '3456789012',
      creditScore: 750,
      income: 180000,
      status: 'accepted'
    }
  ]);

  
  const [rejectedLoans, setRejectedLoans] = useState([
    {
      id: 5,
      name: 'David Brown',
      amount: 100000,
      bankName: 'UBA',
      accountNumber: '7890123456',
      creditScore: 500,
      income: 60000,
      status: 'rejected',
      reason: 'Low credit score and insufficient income'
    }
  ]);

  
  const handleLogin = (e) => {
    e.preventDefault(); 
    if (credentials.username && credentials.password) {
      setIsLoggedIn(true); 
    }
  };

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: '', password: '' });
  };

  
  const approveLoan = (loan) => {
    setAcceptedLoans([...acceptedLoans, { ...loan, status: 'accepted' }]);
  };

  
  const rejectLoan = (loan) => {
    setRejectedLoans([...rejectedLoans, { 
      ...loan, 
      status: 'rejected',
      reason: 'Did not meet lending criteria'
    }]);
  };

  //STEP 4: Build the LOGIN PAGE (shows when not logged in)
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Credit Application System</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  //STEP 5: Build the MAIN DASHBOARD (shows after login)
   return (
    <div>
      <header className="header">
        <h1>Credit Application System</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>
    </div>
  );
  








};

export default Credit;