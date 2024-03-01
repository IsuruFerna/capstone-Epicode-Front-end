import { combineReducers, configureStore } from "@reduxjs/toolkit";
import messageReducer from "../reducers/message";
import postReducer from "../reducers/post_reducer";
import userProfileReducer from "../reducers/userProfile";
import selectedUserReducer from "../reducers/selectedUser";
import commentReducer from "../reducers/comment_reducer";

const bigReducer = combineReducers({
   receiver: messageReducer,
   posts: postReducer,
   userProfile: userProfileReducer,
   selectedUser: selectedUserReducer,
   comments: commentReducer,
});

const store = configureStore({
   reducer: bigReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
