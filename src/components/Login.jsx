import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { authentication, setUserId } from './redux/userReducer';
import { getMyPosts } from './redux/postReducer';

function Login({ setCurruser }) {
  const userid = useSelector((state) => state.user.userID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = async () => {
    console.log(username)
    console.log(password)
    const credentials = {
      username:username,
      password:password
    }

    dispatch(authentication(credentials))
    navigate(`/home/${userid}`);
    // try {
    //   const response = await fetch('https://dummyjson.com/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();
    //   const token = data.token;

    //   localStorage.setItem('token', token);
    //   const userResponse = await fetch('https://dummyjson.com/users', {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   const user = await userResponse.json();
    //   setCurruser(user); 
    //   dispatch(setUserId(data.id));
    //   dispatch(getMyPosts(data.id));
    //   navigate(`/home/${data.id}`);
    // } catch (error) {
    //   console.error('Login failed', error);
    // }
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
