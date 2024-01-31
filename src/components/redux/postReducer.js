import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://dummyjson.com/posts';

export const getPosts = createAsyncThunk('posts/getPosts', 
    () => {
        return fetch(url)
        .then((res) => res.json())
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
        state.myposts = state.myposts.push(action.payload)
    },
    addPost: (state, action) => {
        state.posts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled , (state,action) => {
        state.posts = action.payload;
    })
  }
});

export const {addPost,addMyPost} = postReducer.actions
export default postReducer.reducer;
