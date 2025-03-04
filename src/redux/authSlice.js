import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (user) =>
          user.username === userData.username &&
          user.password === userData.password
      );

      if (foundUser) {
        const fakeToken = `token-${Date.now()}`;
        localStorage.setItem("token", fakeToken);
        return { user: foundUser, token: fakeToken };
      }

      const response = await login(userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Invalid credentials" }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find(
        (user) => user.username === userData.username
      );

      if (userExists) {
        return rejectWithValue({ message: "Username already exists" });
      }

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      return { message: "Registration successful" };
    } catch (error) {
      return rejectWithValue({ message: "Failed to register" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
