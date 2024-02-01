import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userID: null,
  viewID: null,
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
  },
});

export const {setUserId,setViewId} = userReducer.actions

export default userReducer.reducer;
