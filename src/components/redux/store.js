import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';

export default configureStore({
    reducer: {
        user:userReducer,
        posts:postReducer,
        comments:commentReducer
    },
});