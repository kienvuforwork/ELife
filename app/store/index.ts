
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer,  FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,} from "redux-persist";
// import registerModalSlice from "./registerModalSlice";
// import loginModalSlice from "./loginModalSlice";
// import userSlice from "./userSlice";
// const isClient = typeof window !== "undefined";



// let persistedReducer;
// if (isClient) {
//   const { persistReducer } = require("redux-persist");
//   const storage = require("redux-persist/lib/storage").default;
//   const persistConfig = { 
//     key:"root", 
//     storage,
//     whitelist:"userSlice"
//   }
//   const reducer = combineReducers( {  registerModalSlice, loginModalSlice, userSlice })
//  persistedReducer = persistReducer(persistConfig,reducer)
//   };
  




// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";


import registerModalSlice from "./registerModalSlice";
import loginModalSlice from "./loginModalSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {  registerModalSlice, loginModalSlice,userSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;