import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://dummyjson.com/comments?limit=0';

export const getComments = createAsyncThunk('comments/getComments', 
    () => {
        return fetch(url)
        .then((res) => res.json())
        .then((res) => res.comments)
        .catch((err) => console.log(err));
    }
);


const initialState = {
  comments : [],
  mycomments : []
};

const commentReducer = createSlice({
  name:'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
        state.mycomments = state.mycomments.concat(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled , (state,action) => {
        state.comments = action.payload;
    });
    
  }
});

export const {addComment} = commentReducer.actions
export default commentReducer.reducer;
