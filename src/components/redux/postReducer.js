import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://dummyjson.com/posts?limit=0';

export const getPosts = createAsyncThunk('posts/getPosts', 
    () => {
        return fetch(url)
        .then((res) => res.json())
        .then((res) => res.posts)
        .catch((err) => console.log(err));
    }
);

export const getMyPosts = createAsyncThunk('posts/getMyPosts', 
    (id) => {
        return fetch(`https://dummyjson.com/posts/user/${id}`)
        .then((res) => res.json())
        .then((res) => res.posts)
        .catch((err) => console.log(err));
    }
);

const initialState = {
  myposts : [],
  posts : [],
};

const postReducer = createSlice({
  name:'posts',
  initialState,
  reducers: {
    addMyPost: (state, action) => {
        state.myposts = state.myposts.concat(action.payload)
    },
    addPost: (state, action) => {
        state.posts = action.payload
    },
    likePost: (state, action) => {
        state.posts.map((post)=> {
            if (post.id == action.payload) {
                post.reactions = post.reactions+1
            }
        })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled , (state,action) => {
        state.posts = action.payload;
    });
    builder.addCase(getMyPosts.fulfilled , (state,action) => {
        state.myposts = action.payload;
    });
  }
});

export const {addPost,addMyPost,likePost} = postReducer.actions
export default postReducer.reducer;
