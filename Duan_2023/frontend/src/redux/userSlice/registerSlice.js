import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axios.post("http://localhost:5000/signup", userData);
  return response.data;
});
const register = createSlice({
  name: "registers",
  initialState: {
    user: null,
    pending: false,
    error: false,
    message: "",
    message2: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.message = "loading";
        state.message2 = "valid";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.message = action.payload.message;
        console.log("mess", action.payload.message);
        state.user = action.payload.content;
      })
      .addCase(signup.rejected, (state, action) => {
        state.message = "failed";
        state.error = action.payload.message;
      });
  },
});

export default register.reducer;
