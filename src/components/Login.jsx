import '../App.css';
import {useState,useEffect} from 'react';


function Login() {
  const [users,setUsers] = useState([]);
  const [posts,setPosts] = useState([]);
  

  useEffect(() => {
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(res => setUsers(res.users))
    .then(console.log);
  }, []);


 
  return (
    
    <div>
        Login Page
    </div>
    
  );
}

export default Login;
