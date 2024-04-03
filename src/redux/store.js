import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/noteSlice";

const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export default store;
