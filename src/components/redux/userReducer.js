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
    }
  },
});

export const {setUserId} = userReducer.actions

export default userReducer.reducer;
