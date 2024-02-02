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
import { addLike, addMyPost, addPost, likePost } from './redux/postReducer';
import { getPosts } from './redux/postReducer';
import { IoMdLogOut } from "react-icons/io";
import { addComment, getComments } from './redux/commentReducer';
import { addFriend } from './redux/userReducer';



function Mainpage() {
  const userid = useSelector((state) => state.user.userID);
  // const userid = 1
  const posts = useSelector((state) => state.posts.posts);
  const comms = useSelector((state) => state.comments.comments);
  const mycomms = useSelector((state) => state.comments.mycomments);
  const myposts = useSelector((state) => state.posts.myposts);
  const comments = comms.concat(mycomms);
  const like = useSelector((state) => state.posts.like);
  const friends = useSelector((state) => state.user.friends);
  console.log(userid);
  // const {userid} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users,setUsers] = useState([]);
  const [curruser,setCurruser] = useState([]);
  // const [posts,setPosts] = useState(postsredux);
  // const [myposts,setMyposts] = useState(mypostsredux);
  // const [comments,setComments] = useState([]);
  const [postid,setPostid] = useState(false);
  const [postno,setPostno] = useState(null);
  // const [like,setLike] = useState([]);
  const [present,setPresent] = useState(false)
  const [title,setTitle] =useState("")
  const [body,setBody] =useState("")
  const [tags,setTags] =useState([])
  const [newcom,setNewcom] =useState("")
  const [newc,setNewc] = useState(false)
  // const [friends,setFriends]=useState([])
  const suggestions = users.slice(2,8)
  const [showside,setShowside] = useState(false)
  const [showmypost, setShowmypost] =useState(false)
  const [showaddpost, setShowaddpost] =useState(false)
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(res => setUsers(res.users))
    .then(console.log);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://dummyjson.com/posts');
  //       const data = await response.json();
  //       dispatch(addPost(data.posts));
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  useEffect(() => {
    dispatch(getPosts())
    dispatch(getComments())
  },[]);

  useEffect(() => {
    if(userid){
    fetch(`https://dummyjson.com/users/${userid}`)
    .then(res => res.json())
    .then(res => setCurruser(res))
    .then(console.log);
    }
  }, [userid]);

  // const getComment = async (id) => {
  //   try {
  //     const response = await fetch(`https://dummyjson.com/posts/${id}/comments`);
  //     const data = await response.json();
  //     setComments(data.comments);
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //   }
  // }

  const likePostfunc = (id) => {
    if(like.includes(id)==false){
      dispatch(likePost(id))
      dispatch(addLike(id))
    }
  }

  const submitComment = (postid) => {
    const newComment = {
        id: comments.length + 1,
        body: newcom,
        postId: postid,
        user: {
          id: curruser.id,
          username: curruser.username
        }
    }
    // const newcomments = comments.concat(newComment)
    // setComments(newcomments)
    dispatch(addComment(newComment))
    setNewcom("")
  }

  const updateFriends = (id) => {
    dispatch(addFriend(id))
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
        dispatch(addMyPost(res))

        // const newPosts = myposts.concat(res);
        // setMyposts(newPosts)
        setBody("");
        setTitle("");
        setTags([]);
        setShowaddpost(false);
        
    } catch (error) {
        console.error("Error adding post:", error);
    }
};


  // const showComment = (id) => {
  //   setPostid(true)
  //   setPostno(id)
  //   getComment(id)
  // }

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
      <div style={{position:'fixed',zIndex:5,top:0,left:0,right:0}}>
        <div style={{backgroundImage:'linear-gradient(120deg, #667eea 0%, #764ba2 100%)',width:'100%',marginBottom:'0rem',display:'flex',padding:'0.5rem',alignItems:'center'}}>
          <div className='twbirdlogopc'>
            <FaTwitter  size={50} color='#EEF1FF'  />
          </div>
          <div onClick={() => setShowside(!showside)} className='twbirdlogo'>
            <FaTwitter  size={50} color='#EEF1FF'  />
          </div>
          <div class = "twtlogo">
            <img src={logo} style={{width:'9rem',marginLeft:'2rem'}} />
          </div>
          <div class="search-container">
            <input
              type="text"
              style={{borderRadius:30}}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{marginLeft:'-2.3rem'}}>
              <IoMdSearch size={30}  />
            </div>
          </div>
          <div style={{marginLeft:'auto'}}>
            <button onClick={() => navigate('/')} style={{padding:'0.75rem',backgroundColor:'#EEF1FF',border:'none',borderRadius:20,cursor:'pointer'}}><IoMdLogOut /></button>
          </div>
        </div>
        {/* <div style={{display:'flex',justifyContent:'center'}}>
          <hr style={{width:'90%'}}></hr>
        </div> */}
        
      </div>



      <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'4rem'}}>
        <div className={showside ?'left-section-mod':'left-section'}>
        <div style={showside?{padding:'3rem',width:'100%',marginTop:'4.2rem'}:{padding:'3rem',marginTop:'4.2rem',position:'fixed',top:0,bottom:0,left:0,width:'30%'}}>
          <div>
            <div class = "profile-card">
              <div style={{height:'5rem',backgroundColor:'#667eea',borderTopRightRadius:10,borderTopLeftRadius:10,position:'absolute',top:0,left:0,right:0}}></div>
              <div className="profile-picture">
                <div>
                  <img src={curruser.image} style={{width:'3.5rem',height:'3.5rem'}} />
                </div>
              </div>
              <div style={{position:'absolute', top:'2rem',left:'7.5rem'}} >
                <div style={{color:'white',fontSize:18}}>
                  {curruser.firstName} {curruser.lastName}
                </div>
                <div style={{color:'#EEF1FF',fontSize:12,display:'flex'}}>@{curruser.username}</div>
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
              {friends.length>0 && 
              <div>
                <div style={{display:'flex',marginTop:'1rem',marginBottom:'0.5rem',fontSize:16,fontWeight:400}}>Friends</div>
                {users.map((user) => {
                  if(friends.includes(user.id))
                  {
                    return(<div className='suggcard'>
                  <div>
                  <img src={user.image} style={{width:'2.5rem',height:'2.5rem'}} />
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <Link className='suggname' to={`/profile/${user.id}`} style={{fontWeight:'400',fontSize:12,color:'black'}}>
                      {user.firstName} {user.lastName}
                    </Link>
                    <div style={{fontWeight:'400',textDecoration:'none',fontSize:10,color:'black'}}>@{user.username}</div>
                  </div>
                </div>)}
                })}  
              </div>}
              <div style={{display:'flex',columnGap:'1.8rem',marginTop:'2rem',paddingLeft:'2rem'}}>
                {/* <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                    <FaLocationDot />
                    <div>{curruser.address.city}</div>
                </div> */}
                <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center',position:'absolute',top:'5.5rem',left:'7.5rem'}}>
                    <MdOutlineMail />
                    <div>{curruser.email}</div>
                </div>
                {/* </div>
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
                    </div> */}
                    
                    {/* <div style={{display:'flex',columnGap:'0.7rem',justifyContent:'center',alignItems:'center'}}>
                        <FaBuilding />
                        <div>{curruser.company.name}</div>
                    </div> */}
                </div>
            </div>
          </div>
          
          </div>
        </div>

        <div className='right-side'>
        <div style={{padding:'3rem',position:'fixed',top:65,bottom:0,right:0,width:'25%',paddingLeft:'4rem'}}>
          <div className='rightsection'>
        <div style={{backgroundColor:'#764ba2',color:'#FFF',padding:'1rem',fontWeight:'500',fontSize:16,borderRadius:10,paddingBottom:'1.5rem'}}>
              You may know
            </div>
          <div style={{backgroundColor:'#EEF1FF',padding:'1rem',paddingTop:'0.2rem',marginTop:'-0.8rem',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
            
            <div style={{marginTop:'1rem'}}>
              {suggestions.map((user) => {
                if (user.id != curruser.id && !(friends.includes(user.id))){return(
                  <div className='suggcard'>
                    <div>
                    <img src={user.image} style={{width:'2.5rem',height:'2.5rem'}} />
                    </div>
                    <div>
                      <Link className='suggname' to={`/profile/${user.id}`} style={{fontWeight:'400',fontSize:12,color:'black'}}>
                        {user.firstName} {user.lastName}
                      </Link>
                      <div style={{fontWeight:'400',textDecoration:'none',fontSize:10,color:'black'}}>@{user.username}</div>
                    </div>
                    <div onClick={() => updateFriends(user.id)} style={{marginLeft:'auto'}}><IoIosAddCircleOutline style={{width:'1.5rem',height:'1.5rem'}} /></div>
                  </div>
                )
              }})}
            </div>
          </div>
          </div>
        </div>
        </div>


        <div className='main-postcont'>
          <div className="add-post">
              <div>
                <img src={curruser.image} style={{width:'3.5rem',height:'3.5rem'}} />
              </div>
                <div className="text-containers">
                  <input onClick={setShowaddpost} value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="What's in your mind?" />
                  {showaddpost && <div className="text-containers">
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
                </div>}
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
                <div style={{width:'100%',backgroundColor:'#EEF1FF',borderRadius:10,marginBottom:'1rem',padding:'1.5rem',paddingBottom:0}}>
                  <div>
                    {users.map((user) => {
                      if (user.id == post.userId%30){
                        return(
                          <div style={{display:'flex',alignItems:'center',columnGap:'1rem',marginBottom:'0rem'}}>
                            <div>
                            <img src={user.image} style={{width:'2.5rem',height:'2.5rem'}} />
                            </div>
                            <div >
                            <Link to={`/profile/${user.id}`} style={{fontWeight:'400',fontSize:14,color:'black'}}>
                              {user.firstName} {user.lastName}
                            </Link>
                            <div style={{fontWeight:'500',fontSize:10}}>
                              @{user.username}
                            </div>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div style={{padding:'1rem'}}>
                  <div style={{fontWeight:'500',fontSize:14}}>{post.title}</div>
                  <div style={{fontWeight:'400',fontSize:12,padding:'0.5rem'}}>{post.body}</div>
                  <div style={{display:'flex'}}>
                    {post.tags.map((tag) => {
                      return(
                        <div style={{backgroundColor:'#B1B2FF',padding:'0.5rem',paddingLeft:'1rem',paddingRight:'1rem',marginRight:'1rem',borderRadius:20,fontSize:12}}>{!showmypost ? tag : tag.value || tag}</div>
                      )
                    })}
                  </div>
                  <div style={{display:'flex',cursor:'pointer'}}>
                    <div onClick={() => likePostfunc(post.id)} style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'0.5rem',border:'none',borderRadius:5,fontSize:12,columnGap:5}}>
                      <div><AiTwotoneLike size={20} /></div> 
                      <div style={{fontWeight:'400',fontSize:11,padding:'0.2rem'}}>{post.reactions} likes</div>
                    </div>
                    {!showmypost && <div onClick={() => setPostid(post.id)} style={{display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer',padding:'0.5rem',border:'none',borderRadius:5,fontSize:12,columnGap:10}}>
                      <div><CgComment size={20} /></div> 
                      <div>Comment</div>
                    </div>}
                  </div>
                  {postid == post.id && 
                  <div >
                    <div style={{display:'flex',marginBottom:'1rem',alignItems:'center'}}>
                      <div style={{width:'80%'}}><input value={newcom} onChange={(e) => setNewcom(e.target.value)} type="text" placeholder="What's in your mind?" /></div>
                      <div onClick={() => submitComment(post.id)} style={{marginLeft:'-2rem',borderRadius:10,padding:'0.5rem',cursor:'pointer'}}><BsSendFill /></div>
                    </div>
                    {comments.map((comment) => {
                      if(comment.postId == post.id){
                        return(
                          <div style={{display:'flex',columnGap:'1rem',marginBottom:'0.5rem'}}>
                              <div>
                                {
                                  users.map((user) => {
                                    if(user.id == comment.user.id%30){
                                      return(
                                        <div style={{display:'flex',alignItems:'center',columnGap:'1rem'}}>
                                          <div>
                                            <img src={user.image} style={{width:'2.5rem',height:'2.5rem'}} />
                                          </div>
                                          <div>
                                            <div style={{fontWeight:'500',fontSize:12}}>{user.firstName}</div>
                                            <div style={{color:'gray',fontSize:10}}>{comment.body}</div>
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
