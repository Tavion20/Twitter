export const SET_USER_ID = 'SET_USER_ID';
export const SET_VIEW_ID = 'SET_VIEW_ID';

export const setUserID = (userID) => ({
  type: SET_USER_ID,
  payload: userID,
});

export const setViewID = (viewID) => ({
  type: SET_VIEW_ID,
  payload: viewID,
});