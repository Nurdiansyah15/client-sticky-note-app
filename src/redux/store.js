import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/noteSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    note: noteReducer,
    user: userReducer,
  },
});

export default store;
