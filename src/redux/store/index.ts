import { combineReducers, configureStore } from "@reduxjs/toolkit";
import messageReducer from "../reducers/message";

const bigReducer = combineReducers({
   receiver: messageReducer,
});

const store = configureStore({
   reducer: bigReducer,
});

export default store;
