import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserID } from './redux/actions';

function Login({curruser,setCurruser}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(res => setUsers(res.users))
      .then(console.log);
  }, []);

  const findUser = () => {
    users.filter((user) => {
      if(user.username==username && user.password==password){
        setCurruser(user)
        dispatch(setUserID(user));
        navigate(`/home/${user.id}`);
      }
    })
  }

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'5rem'}}>
    <div className="container">
      <div className="form-container sign-in">
        <form action="/signin" method="post">
          <h1>Sign In</h1>
          <div className="social-icons">
            {/* Add Twitter logo here */}
          </div>
          <span>or use your email and password</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Name" name="name" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" name="password" required />
          <a href="#">Forgot Password?</a><br />
          <button onClick={() => findUser()}>Sign In</button>
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
    </div>
  );
}

export default Login;
