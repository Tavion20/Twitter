import '../App.css';
import logo from '../assets/logo.png'
import {useState,useEffect} from 'react';
import { RxAvatar } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiTwotoneLike } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import Select from 'react-select'
import { GiBirdTwitter } from "react-icons/gi";
import { IoMdSearch } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";



function Mainpage() {
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

  const getComment = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}/comments`);
      const data = await response.json();
      setComments(data.comments);
      console.log(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
  

  const showComment = (id) => {
    setPostid(true)
    getComment(id)
  }

  const options = [
    { value: 'history', label: 'History' },
    { value: 'american', label: 'American' },
    { value: 'crime', label: 'Crime' },
    { value: 'horror', label: 'Horror' },
    { value: 'sarcasm', label: 'Sarcasm' }
  ]
  return (
    
    <div>
      <div>
        <div style={{backgroundColor:'#B1B2FF',width:'99%',marginBottom:'1rem',display:'flex',padding:'0.5rem',alignItems:'center',position:'fixed',zIndex:5}}>
          <div style={{marginLeft:'1.5rem'}}>
            <FaTwitter  size={50} color='#EEF1FF' />
          </div>
          <div>
            <img src={logo} style={{width:'9rem',marginLeft:'2rem'}} />
          </div>
          <div class="search-container">
            <input type="text" placeholder="Search"/>
            <div style={{marginLeft:'-2.3rem'}}>
              <IoMdSearch size={30}  />
            </div>
          </div>
        </div>
      </div>
      <div style={{display:'flex',paddingTop:'4rem'}}>

        <div style={{flex:3,padding:'3rem',position:'sticky'}}>
          <div>
          
            <div class = "profile-card">
            <div className="profile-picture">
            <FaUserCircle size={100} color="#007bff" />
            </div>
              <div class = "followers-following">
                <div class = "followers">
                  <h4>Followers</h4>
                  <p>1000</p>
                </div>
                <div class = "following">
                  <h4>Following</h4>
                  <p>500</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{borderRadius:'20',marginTop:'3rem'}}>
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
          <div className="add-post">
                <FaUserCircle size={70} color="#007bff" />
                <div className="text-containers">
                  <input type="text" placeholder="What's in your mind Peter?" />
                  <textarea placeholder='Express Yourself....' style={{height:'4.5rem',resize:'none',padding:'0.5rem',fontSize:'18',borderRadius:10,border:'none'}} />
                  <Select
                    closeMenuOnSelect={true}
                    defaultValue={[options[0]]}
                    isMulti
                    options={options}
                  />
                  <button style={{width:'5rem',marginLeft:'auto',backgroundColor:'#B1B2FF',padding:'0.5rem',border:'none',borderRadius:5,fontSize:18}}>Post</button>
                </div>
          </div>
          <div style={{marginTop:'3rem'}}>
            {posts.map((post) => {
              return(
                <div style={{width:'80%',backgroundColor:'#EEF1FF',borderRadius:20,marginBottom:'1rem',padding:'1.5rem'}}>
                  <div>
                    {users.map((user) => {
                      if (user.id == post.userId%30){
                        return(
                          <div style={{display:'flex',alignItems:'center',columnGap:'1rem',marginBottom:'1rem'}}>
                            <div>
                            <img src={user.image} style={{width:'3.5rem',height:'3.5rem'}} />
                            </div>
                            <div style={{fontWeight:'300',fontSize:18}}>
                              {user.firstName} {user.lastName}
                            </div>
                            
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div style={{padding:'1rem'}}>
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
                    <div onClick={() => showComment(post.id)} style={{display:'flex',cursor:'pointer',backgroundColor:'#B1B2FF',padding:'0.5rem',border:'none',borderRadius:5,fontSize:18,columnGap:10}}>
                      <div><CgComment size={25} /></div> 
                      <div>Comment</div>
                    </div>
                  </div>
                  {postid && 
                  <div style={{marginTop:'2rem'}}>
                    {comments.map((comment) => {
                      if(comment.postId == post.id){
                        return(
                          <div style={{display:'flex',columnGap:'1rem',marginBottom:'1rem'}}>
                              <div>
                                {
                                  users.map((user) => {
                                    if(user.id == comment.user.id%30){
                                      return(
                                        <img src={user.image} style={{width:'3.5rem',height:'3.5rem'}} />
                                      )
                                    }
                                  })
                                }
                              </div>
                              <div style={{backgroundColor:'#B1B2FF',padding:'1rem',borderRadius:10,opacity:'50%'}}>{comment.body}</div>
                          </div>
                        )
                      }
                    })}
                  </div>}
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

export default Mainpage;
