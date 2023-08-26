import storage from "redux-persist/lib/storage"; // Import storage for local storage
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root", // Root key for local storage
  storage, // Use local storage
  whitelist: ["user"], // Reducer names to persist (here, "user")
};

export default persistConfig;