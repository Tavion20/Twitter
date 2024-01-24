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
import { BsSendFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserID, setViewID } from './redux/actions';
import { useParams } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaBabyCarriage } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { MdBloodtype } from "react-icons/md";

function Mainpage() {
  // const curruser = useSelector((state) => state.user.userID);
  const {userid} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users,setUsers] = useState([]);
  const [curruser,setCurruser] = useState([]);
  const [posts,setPosts] = useState([]);
  const [myposts,setMyposts] = useState([]);
  const [comments,setComments] = useState([]);
  const [postid,setPostid] = useState(false);
  const [postno,setPostno] = useState(null);
  const [like,setLike] = useState(0);
  const [title,setTitle] =useState("")
  const [body,setBody] =useState("")
  const [tags,setTags] =useState([])
  const [newcom,setNewcom] =useState("")
  const [newc,setNewc] = useState(false)
  const [friends,setFriends]=useState([])
  const suggestions = users.slice(2,8)
  
  const [showmypost, setShowmypost] =useState(false)
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    if(userid){
    fetch(`https://dummyjson.com/users/${userid}`)
    .then(res => res.json())
    .then(res => setCurruser(res))
    .then(console.log);
    }
  }, [userid]);

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

  const likePost = () => {
    if(like==0){
      setLike(1)
    }
  }

  const submitComment = () => {
    const newComment = {
        id: comments.length + 1,
        body: newcom,
        postId: postno,
        user: {
          id: curruser.id,
          username: curruser.username
        }
    }
    const newcomments = comments.concat(newComment)
    setComments(newcomments)
    setNewcom("")
  }

  const updateFriends = (id) => {
    console.log(id)
    const newfriends = friends.concat(id)
    setFriends(newfriends)
  }

  const openProfile = (id) => {
    console.log(id)
    dispatch(setViewID(id));
    navigate('/profile')
  }
  
  const addPost = async () => {
    if(title =="" ||body == "" ||tags==null)
    {
      return "not complete"
    }
    try {
        const response = await fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                userId: curruser.id,
                body: body,
                tags: tags,
                reactions: 0,
                id: myposts.length + 1
            })
        });

        const res = await response.json();

        const newPosts = myposts.concat(res);
        setMyposts(newPosts)
        setBody("");
        setTitle("");
        setTags([]);
        console.log(myposts);
        console.log(posts)
    } catch (error) {
        console.error("Error adding post:", error);
    }
};


  const showComment = (id) => {
    setPostid(true)
    setPostno(id)
    getComment(id)
  }

  const options = [
    { value: 'history', label: 'History' },
    { value: 'american', label: 'American' },
    { value: 'crime', label: 'Crime' },
    { value: 'horror', label: 'Horror' },
    { value: 'sarcasm', label: 'Sarcasm' }
  ]

  const newData = posts
  .map((post) => {
    if (search === "" || post.title.toLowerCase().includes(search.toLowerCase()) ) {
      return post;
    }
    return null;
  })
  .filter(Boolean);


  return (
    
    <div>
      <div>
        <div style={{backgroundColor:'#B1B2FF',width:'100%',marginBottom:'1rem',display:'flex',padding:'0.5rem',alignItems:'center',position:'fixed',zIndex:5}}>
          <div class = "twtlogo" style={{marginLeft:'1.5rem'}}>
            <FaTwitter  size={50} color='#EEF1FF'  />
          </div>
          <div>
            <img src={logo} style={{width:'9rem',marginLeft:'2rem'}} />
          </div>
          <div class="search-container">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{marginLeft:'-2.3rem'}}>
              <IoMdSearch size={30}  />
            </div>
          </div>
          <div style={{marginLeft:'auto'}}>
            <button onClick={() => navigate('/')} style={{padding:'0.5rem',backgroundColor:'#EEF1FF',border:'none',borderRadius:20}}>Logout</button>
          </div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'4rem'}}>

        <div style={{padding:'3rem',position:'fixed',top:65,bottom:0,left:0,width:'30%'}}>
          <div>
          
            <div class = "profile-card">
            <div className="profile-picture">
              <div>
                <img src={curruser.image} style={{width:'3.5rem',height:'3.5rem'}} />
              </div>
              <div>{curruser.firstName} {curruser.lastName}</div>
            </div>
              <div class = "followers-following">
                <div class = "followers">
                  <h4>Age</h4>
                  <p>{curruser.age}</p>
                </div>
                <div class = "following">
                  <h4>Gender</h4>
                  <p>{curruser.gender}</p>
                </div>
              </div>
            </div>
          </div>
          <div class = "suggestion-box">
          <div style={{borderRadius:20,marginTop:'1rem',backgroundColor:'#EEF1FF',paddingBottom:'2rem',paddingTop:'0.5rem'}}>
          <div>
                       
                        <div style={{display:'flex',columnGap:'1.8rem',marginTop:'2rem',paddingLeft:'2rem'}}>
                            {/* <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                                <FaLocationDot />
                                <div>{curruser.address.city}</div>
                            </div> */}
                            <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                                <MdOutlineMail />
                                <div>{curruser.email}</div>
                            </div>
                        </div>
                        <div style={{display:'flex',columnGap:'1.8rem',marginTop:'1rem',paddingLeft:'2rem'}}>
                        <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                                <FaBabyCarriage />
                                <div>{curruser.birthDate}</div>
                            </div>
                            
                        </div>
                        <div style={{display:'flex',columnGap:'1.8rem',marginTop:'1rem',paddingLeft:'2rem'}}>
                        
                            
                            <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                                <FaPhoneAlt />
                                <div>{curruser.phone}</div>
                            </div>
                        </div>
                        
                        <div style={{display:'flex',columnGap:'5rem',marginTop:'1rem',paddingLeft:'2rem'}}>
                        <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                                <MdBloodtype />
                                <div>{curruser.bloodGroup}</div>
                            </div>
                            
                            {/* <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                                <FaBuilding />
                                <div>{curruser.company.name}</div>
                            </div> */}
                        </div>
                    </div>
          </div>
          </div>
        </div>

        <div style={{padding:'3rem',position:'fixed',top:65,bottom:0,right:0,width:'30%'}}>
          <div className='rightsection'>
        <div style={{backgroundColor:'#B1B2FF',padding:'1rem',fontWeight:'500',fontSize:24,borderRadius:20,paddingBottom:'1.5rem'}}>
              Suggestions
            </div>
          <div style={{backgroundColor:'#EEF1FF',padding:'1rem',marginTop:'-0.8rem',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
            
            <div style={{marginTop:'1rem'}}>
              {suggestions.map((user) => {
                if (user.id != curruser.id && !(friends.includes(user.id))){return(
                  <div style={{display:'flex',alignItems:'center',columnGap:'1rem',marginBottom:'1rem'}}>
                    <div>
                    <img src={user.image} style={{width:'3.5rem',height:'3.5rem'}} />
                    </div>
                    <Link to={`/profile/${user.id}`} style={{fontWeight:'300',fontSize:16,color:'black'}}>
                      {user.firstName} {user.lastName}
                    </Link>
                    <div onClick={() => updateFriends(user.id)} style={{marginLeft:'auto'}}><IoIosAddCircleOutline style={{width:'1.5rem',height:'1.5rem'}} /></div>
                  </div>
                )
              }})}
            </div>
          </div>
          </div>
        </div>


        <div style={{flex:0.5,paddingTop:'3rem',marginLeft:'8rem'}}>
          <div className="add-post">
              <div>
                <img src={curruser.image} style={{width:'3.5rem',height:'3.5rem'}} />
              </div>
                <div className="text-containers">
                  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="What's in your mind?" />
                  <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='Express Yourself....' style={{height:'4.5rem',resize:'none',padding:'0.5rem',fontSize:'12',borderRadius:10,border:'none',outline:'none'}} />
                  <Select
                    closeMenuOnSelect={true}
                    defaultValue={tags}
                    isMulti
                    options={options}
                    value={tags}
                    onChange={setTags}
                  />
                  <button onClick={() => addPost()} style={{width:'5rem',marginLeft:'auto',backgroundColor:'#B1B2FF',padding:'0.5rem',border:'none',borderRadius:5,fontSize:18}}>Tweet</button>
                </div>
          </div>
          <div style={{marginTop:'3rem'}}>
            <div style={{display:'flex',alignItems:'center',columnGap:'1.5rem',marginBottom:'1.5rem'}}>
              <div style={!showmypost ?{borderBottom: '5px solid purple',paddingBottom:'0.5rem',cursor:'pointer'} : {cursor:'pointer'}} onClick={() => setShowmypost(false)}>For You</div>
              <div style={showmypost ?{borderBottom: '5px solid purple',paddingBottom:'0.5rem',cursor:'pointer'} : {cursor:'pointer'}} onClick={() => setShowmypost(true)}>My Posts</div>
            </div>
            {(!showmypost ? posts : myposts).length === 0 ? (
              <p>No records found </p>
            ) :(!showmypost ? (search == "" ? (search == "" ? posts : newData) : newData): myposts).map((post) => {
              return(
                <div style={{width:'80%',backgroundColor:'#EEF1FF',borderRadius:20,marginBottom:'1rem',padding:'1.5rem',paddingBottom:0}}>
                  <div>
                    {users.map((user) => {
                      if (user.id == post.userId%30){
                        return(
                          <div style={{display:'flex',alignItems:'center',columnGap:'1rem',marginBottom:'1rem'}}>
                            <div>
                            <img src={user.image} style={{width:'3.5rem',height:'3.5rem'}} />
                            </div>
                            <div >
                            <Link to={`/profile/${user.id}`} style={{fontWeight:'400',fontSize:16,color:'black'}}>
                              {user.firstName} {user.lastName}
                            </Link>
                            <div style={{fontWeight:'500',fontSize:14}}>
                              @{user.username}
                            </div>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div style={{padding:'1rem'}}>
                  <div style={{fontWeight:'500',fontSize:16}}>{post.title}</div>
                  <div style={{fontWeight:'300',fontSize:14,padding:'0.5rem'}}>{post.body}</div>
                  <div style={{display:'flex'}}>
                    {post.tags.map((tag) => {
                      return(
                        <div style={{backgroundColor:'#B1B2FF',padding:'0.5rem',paddingLeft:'1rem',paddingRight:'1rem',marginRight:'1rem',borderRadius:20,fontSize:12}}>{!showmypost ? tag : tag.value}</div>
                      )
                    })}
                  </div>
                  <div style={{fontWeight:'300',fontSize:10,padding:'0.5rem'}}>{post.reactions + like} likes</div>
                  <div style={{display:'flex',columnGap:20}}>
                    <div onClick={() => likePost()} style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#B1B2FF',padding:'0.5rem',border:'none',borderRadius:5,fontSize:12,columnGap:5}}>
                      <div><AiTwotoneLike size={20} /></div> 
                      <div>Like</div>
                    </div>
                    {!showmypost && <div onClick={() => showComment(post.id)} style={{display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',backgroundColor:'#B1B2FF',padding:'0.5rem',border:'none',borderRadius:5,fontSize:12,columnGap:10}}>
                      <div><CgComment size={20} /></div> 
                      <div>Comment</div>
                    </div>}
                  </div>
                  {postid && 
                  <div style={{marginTop:'2rem'}}>
                    {post.id == postno && <div style={{display:'flex',marginBottom:'1rem',alignItems:'center'}}>
                      <div style={{width:'80%'}}><input value={newcom} onChange={(e) => setNewcom(e.target.value)} type="text" placeholder="What's in your mind?" /></div>
                      <div onClick={() => submitComment()} style={{marginLeft:'-2rem',backgroundColor:'#B1B2FF',borderRadius:10,padding:'0.5rem'}}><BsSendFill /></div>
                    </div>}
                    {comments.map((comment) => {
                      if(comment.postId == post.id){
                        return(
                          <div style={{display:'flex',columnGap:'1rem',marginBottom:'1rem'}}>
                              <div>
                                {
                                  users.map((user) => {
                                    if(user.id == comment.user.id%30){
                                      return(
                                        <div style={{display:'flex',alignItems:'center',columnGap:'1rem'}}>
                                          <div>
                                            <img src={user.image} style={{width:'3.5rem',height:'3.5rem'}} />
                                          </div>
                                          <div>
                                            <div style={{fontWeight:'500',fontSize:14}}>{user.firstName}</div>
                                            <div style={{color:'gray',fontSize:12}}>{comment.body}</div>
                                          </div>
                                        </div>
                                      )
                                    }
                                  })
                                }
                              </div>
                              
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