import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    const response = await authService.login(user);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const GetMe = createAsyncThunk("user/GetMe", async (_, thunkAPI) => {
  try {
    const response = await authService.getMe();
    return response.data;
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogoutUser = createAsyncThunk("user/LogoutUser", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
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

export const { reset, setMessage, clearMessage } = authSlice.actions;
export default authSlice.reducer;
