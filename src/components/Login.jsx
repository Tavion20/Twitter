import React, { useState, useEffect } from 'react';
import '../App.css';

function Login() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(res => setUsers(res.users))
      .then(console.log);
  }, []);

  return (
    <div className="container">
      <div className="form-container sign-in">
        <form action="/signin" method="post">
          <h1>Sign In</h1>
          <div className="social-icons">
            {/* Add Twitter logo here */}
          </div>
          <span>or use your email and password</span>
          <input type="text" placeholder="Name" name="name" required />
          <input type="password" placeholder="Password" name="password" required />
          <a href="#">Forgot Password?</a><br />
          <button type="submit">Sign In</button>
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
            <button className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
