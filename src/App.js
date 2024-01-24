import './App.css';
import {useState,useEffect} from 'react';
import Mainpage from './components/Mainpage';
import Login from './components/Login';
import { HashRouter, Route, Routes } from "react-router-dom";
import Profile from './components/Profile';

function App() {
  const [users,setUsers] = useState([]);
  const [posts,setPosts] = useState([]);
  const [comments,setComments] = useState([]);
  const [postid,setPostid] = useState(false);
  const [curruser,setCurruser] = useState([]);


  useEffect(() => {
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(res => setUsers(res.users))
    .then(console.log);
  }, []);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(res => setPosts(res.posts))
    .then(console.log);
  }, []);

 
  return (
    
    <div>
      <HashRouter basename='/'>
        <Routes>
          <Route path='/' element={<Login curruser={curruser} setCurruser={setCurruser} />} />
          <Route path='/home/:userid' element={<Mainpage />} />
          <Route path='/profile/:curruserid' element={<Profile />} />
        </Routes>
      </HashRouter>  
    </div>
    
  );
}

export default App;
