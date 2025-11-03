//STEP 1: Import React and useState
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

//STEP 2: Create the component and declare ALL state variables
const Login = () => {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const redirect = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

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

};

export default Login;