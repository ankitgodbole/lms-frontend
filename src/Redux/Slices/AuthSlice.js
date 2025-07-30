import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/AxiosInstance.js";



const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

export const createAccount = createAsyncThunk(
  "auth/signup",
  async (formData) => {
    try {
      const resPromise = axiosInstance.post("user/register", formData);

      const res = await toast.promise(resPromise, {
        loading: "Creating your account...",
        success: (res) => res.data.message,
        error: (err) =>
          err?.response?.data?.message || "Failed to create account",
      });

      return res.data; // Needed for `response.payload` on the frontend
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// export {} = authSlice.actions;
export default authSlice.reducer;
 
