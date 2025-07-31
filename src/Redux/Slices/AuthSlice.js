import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/AxiosInstance.js";



const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};



//for registration 
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

      return ( await res.data); // Needed for `response.payload` on the frontend
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }
);


//for login data 
export const login = createAsyncThunk(
  "auth/login",
  async (loginData) => {
    try {
      const resPromise = axiosInstance.post("user/login", loginData);

      const res = await toast.promise(resPromise, {
        loading: "Wait! chekcing your credentials ...",
        success: (res) => res.data.message,
        error: (err) =>
          err?.response?.data?.message || "Failed to Login",
      });

      return (await res.data); // Needed for `response.payload` on the frontend
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
  extraReducers : (builder)=>{
    builder.addCase(login.fulfilled, (state , action)=>{
      localStorage.setItem("data",JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role",  action?.payload?.user?.role );
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })
  }
});

// export {} = authSlice.actions;
export default authSlice.reducer;
 
