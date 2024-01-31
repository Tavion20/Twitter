import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserID } from './redux/actions';

function Login({ setCurruser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        setLoginStatus('Invalid credentials. Please try again.');
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem('token', token);

      console.log('Login successful');
      console.log('Token:', token);

      
      const userResponse = await fetch('https://dummyjson.com/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const user = await userResponse.json();
      setCurruser(user); 
      dispatch(setUserID(user));
      navigate(`/home/${user.id}`);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5rem' }}>
      <div className="container">
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" name="username" required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" required />
            <a href="#">Forgot Password?</a>
            <br />
            <button type="button" onClick={handleLogin}>Sign In</button>
            {loginStatus && <p style={{ color: 'red' }}>{loginStatus}</p>}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button className="hidden" id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of the site features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
