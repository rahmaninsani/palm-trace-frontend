import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:9999/api/users/login", {
      email: user.email,
      password: user.password,
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.errors;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const GetMe = createAsyncThunk("user/GetMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:9999/api/users/me");
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.errors;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
});

export const LogoutUser = createAsyncThunk("user/LogoutUser", async () => {
  await axios.delete("http://localhost:9999/api/users/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // LoginUser
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(LoginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });

    builder.addCase(LoginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });

    // GetMe - Get User Login
    builder.addCase(GetMe.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(GetMe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });

    builder.addCase(GetMe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;