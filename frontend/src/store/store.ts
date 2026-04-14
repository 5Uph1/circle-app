import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import threadReducer from "./threadSlice"
import replyReducer from "./replySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
    reply: replyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
