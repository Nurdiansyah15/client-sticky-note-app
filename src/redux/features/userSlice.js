import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
      token: "",
      isLogin: false,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        username: "",
        email: "",
        token: "",
        isLogin: false,
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
