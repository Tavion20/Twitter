import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userID: null,
  viewID: null,
  friends: []
};

const userReducer = createSlice({
  name:'user',
  initialState,
  reducers:{
    setUserId : (state,action) => {
      state.userID = action.payload
    },
    setViewId : (state,action) => {
      state.viewID = action.payload
    },
    addFriend: (state, action) => {
      state.friends = state.friends.concat(action.payload)
    },
  },
});

export const {setUserId,setViewId,addFriend} = userReducer.actions

export default userReducer.reducer;
