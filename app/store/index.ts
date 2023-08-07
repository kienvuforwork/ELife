import { configureStore } from "@reduxjs/toolkit";

import dropdownSlice from "./dropdownSlice";
import registerModalSlice from "./registerModalSlice";
import loginModalSlice from "./loginModalSlice";

export const store = configureStore({
  reducer: { dropdownSlice, registerModalSlice, loginModalSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;