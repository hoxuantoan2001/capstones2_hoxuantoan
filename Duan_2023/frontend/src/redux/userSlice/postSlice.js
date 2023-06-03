import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../services/auth.header";
export const addPost = createAsyncThunk("post/addpost", async (userData) => {
  const response = await axios.post("http://localhost:5000/post", userData, {
    headers: authHeader(),
  });
  return response.data;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    pending: false,
    error: false,
    isloading: false,
    message: "",
    postId: "",
  },
  reducers: {
    deletepost: (state) => {
      state.post = null;
      state.message = "Successed";
    },
    updatepost: (state, action) => {
      state.post = action.payload;
      state.message = "Successed";
    },
    addPostid: (state, action) => {
      state.postId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.message = "loading";
        state.isloading = false;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.message = "succeeded";
        console.log("action.payload.content", action.payload);

        state.post = action?.payload?.content;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.message = "failed";
        state.error = action.error.message;
        state.isloading = false;
      });
  },
});

export const { deletepost, updatepost, addPostid } = postSlice.actions;
export default postSlice.reducer;
