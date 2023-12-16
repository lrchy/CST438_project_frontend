import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Redirect
import '../styles/Login.css';
import Button from '@mui/material/Button';
import App from '../App';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [isAuthenticated, setAuth] = useState(false);

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
  
      const jwtToken = res.headers.get('Authorization');
      if (jwtToken !== null) {
        sessionStorage.setItem('jwt', jwtToken);
        setAuth(true);
      }
  
      return data;
    })
    .catch((err) => console.log('Error during login:', err));
  };
  

  if (isAuthenticated) {
    return <Navigate to="/app" />;
  } else {
    return (
      <div id="login-div">
        <div id="creds">
        <input type="text" name="username" class="login-input" placeholder='Username' value={user.username} onChange={onChange} />
        <input type="text" name="password" class="login-input" placeholder='Password' value={user.password} onChange={onChange} />
        </div>
        <br />
        <Button id="submit" onClick={login}>
          Login
        </Button>
      </div>
    );
  }
}

export default Login;
