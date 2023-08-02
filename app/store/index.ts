import { configureStore } from "@reduxjs/toolkit";

import dropdownSlice from "./dropdownSlice";

export const store = configureStore({
  reducer: { dropdownSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;