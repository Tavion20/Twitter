import { SET_USER_ID , SET_VIEW_ID} from './actions';

const initialState = {
  userID: null,
  viewID: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userID: action.payload,
      };
    case SET_VIEW_ID:
      return {
        ...state,
        viewID: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
