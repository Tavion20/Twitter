import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userReducer';
import postReducer from './postReducer';

export default configureStore({
    reducer: {
        user:userReducer,
        posts:postReducer
    },
});