import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from "./features/pagesSlice";

const store = configureStore({
  reducer: {
    pages: pagesReducer,
  },
});

export default store;
