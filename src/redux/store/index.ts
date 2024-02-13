import { combineReducers, configureStore } from "@reduxjs/toolkit";
import messageReducer from "../reducers/message";
import postReducer from "../reducers/post";

const bigReducer = combineReducers({
   receiver: messageReducer,
   posts: postReducer,
});

const store = configureStore({
   reducer: bigReducer,
});

export default store;
