import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("Login action payload:", action.payload);
      const user = {
        ...action.payload.user,
        token: action.payload?.token || "",
      };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
