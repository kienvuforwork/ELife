import { configureStore } from "@reduxjs/toolkit";


import registerModalSlice from "./registerModalSlice";
import loginModalSlice from "./loginModalSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {  registerModalSlice, loginModalSlice,userSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;