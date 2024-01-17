import './App.css';
import {useState,useEffect} from 'react';
import { RxAvatar } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import { CgComment } from "react-icons/cg";


function App() {
  const [users,setUsers] = useState([]);
  const [posts,setPosts] = useState([]);

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
      <div style={{backgroundColor:'#B1B2FF',height:'3.5rem',width:'100%',marginBottom:'1rem'}}>Header Placeholder</div>
      <div style={{display:'flex'}}>

        <div style={{flex:3,padding:'3rem',position:'sticky'}}>
          <div>
            Profile
          </div>
          <div style={{borderRadius:'20',marginTop:'1rem'}}>
          <div style={{backgroundColor:'#B1B2FF',padding:'1rem',fontWeight:'500',fontSize:24}}>
              Suggestions
            </div>
          <div style={{backgroundColor:'#EEF1FF',padding:'1rem'}}>
            
            <div style={{marginTop:'1rem'}}>
              {users.map((user) => {
                return(
                  <div style={{display:'flex',alignItems:'center',columnGap:'1rem',marginBottom:'1rem'}}>
                    <div>
                    <img src={user.image} style={{width:'3.5rem',height:'3.5rem'}} />
                    </div>
                    <div style={{fontWeight:'300',fontSize:18}}>
                      {user.firstName} {user.lastName}
                    </div>
                    <div style={{marginLeft:'auto'}}><IoIosAddCircleOutline style={{width:'1.5rem',height:'1.5rem'}} /></div>
                  </div>
                )
              })}
            </div>
          </div>
          </div>
        </div>


        <div style={{flex:7,paddingTop:'3rem'}}>
          <div>
            {posts.map((post) => {
              return(
                <div style={{width:'80%',backgroundColor:'#EEF1FF',borderRadius:20,marginBottom:'1rem',padding:'1.5rem'}}>
                  <div style={{fontWeight:'500',fontSize:24}}>{post.title}</div>
                  <div style={{fontWeight:'300',fontSize:18,padding:'0.5rem'}}>{post.body}</div>
                  <div style={{display:'flex'}}>
                    {post.tags.map((tag) => {
                      return(
                        <div style={{backgroundColor:'#B1B2FF',padding:'0.5rem',paddingLeft:'1rem',paddingRight:'1rem',marginRight:'1rem',borderRadius:20}}>{tag}</div>
                      )
                    })}
                  </div>
                  <div style={{fontWeight:'300',fontSize:16,padding:'0.5rem'}}>{post.reactions} likes</div>
                  <div style={{display:'flex',columnGap:20}}>
                    <div style={{display:'flex',backgroundColor:'#B1B2FF',padding:'0.5rem',border:'none',borderRadius:5,fontSize:18,columnGap:10}}>
                      <div><AiTwotoneLike size={25} /></div> 
                      <div>Like</div>
                    </div>
                    <div style={{display:'flex',backgroundColor:'#B1B2FF',padding:'0.5rem',border:'none',borderRadius:5,fontSize:18,columnGap:10}}>
                      <div><CgComment size={25} /></div> 
                      <div>Comment</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
