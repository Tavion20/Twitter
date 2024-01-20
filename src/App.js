import './App.css';
import {useState,useEffect} from 'react';
import Mainpage from './components/Mainpage';
import Login from './components/Login';

function App() {
  const [users,setUsers] = useState([]);
  const [posts,setPosts] = useState([]);
  const [comments,setComments] = useState([]);
  const [postid,setPostid] = useState(false);

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
      <Login />
    </div>
    
  );
}

export default App;
