import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  userID: null,
  viewID: null,
  friends: [],
  token: false
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
  extraReducers: (builder) => {
    builder.addCase(authentication.fulfilled , (state,action) => {
        state.userID = action.payload.id;
        state.token = true;
    });
  }
});

export const authentication = createAsyncThunk('user/authentication', 
    (credentials) => {
      console.log(credentials.username)
      console.log(credentials.password)
      const username=credentials.username
      const password=credentials.password
      return fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      .then((res) => res.json())
    

      // const data = {
      //   id: res.id, 
      //   token: res.token, 
      // };
      // console.log(data);
      // return data;
    }
);

export const {setUserId,setViewId,addFriend} = userReducer.actions

export default userReducer.reducer;
