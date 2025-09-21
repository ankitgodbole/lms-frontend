import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance.js";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

// ✅ for registration
export const createAccount = createAsyncThunk(
  "/auth/signup",
  async (formData) => {
    try {
      const resPromise = axiosInstance.post("user/register", formData);

      const res = await toast.promise(resPromise, {
        loading: "Creating your account...",
        success: (res) => res.data.message,
        error: (err) =>
          err?.response?.data?.message || "Failed to create account",
      });

      return res.data; // backend should return { user, token, message }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }
);

// ✅ for login
export const login = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const resPromise = axiosInstance.post("/user/login", loginData);

    const res = await toast.promise(resPromise, {
      loading: "Wait! checking your credentials ...",
      success: (res) => res.data.message,
      error: (err) => err?.response?.data?.message || "Failed to Login",
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
    throw error;
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("/user/logout");
    toast.promise(res, {
      loading: "Wait! logging out...",
      success: (data) => data?.data?.message,
      error: "Failed to Logout ",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to logout");
    throw error;
  }
});

//    for getUserData 
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/me");
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

//for updateprofile 
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async ( data) => {
    try {
      const resPromise = axiosInstance.put(`/user/update`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const res = await toast.promise(resPromise, {
        loading: "Updating your profile...",
        success: (res) => res?.data?.message,
        error: (err) =>
          err?.response?.data?.message || "Failed to update profile",
      });

      return await res.data; // { success, message, user }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return  toast.error(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Login success
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);

        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      // ✅ Register success → Auto login
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);

        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      // ✅ Logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.role = "";
        state.isLoggedIn = false;
      })

      //update profile
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action.payload;
      });



  },
});

export default authSlice.reducer;
