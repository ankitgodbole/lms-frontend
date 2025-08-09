import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/AxiosInstance.js";

const initialState = {
  courseData: [],
  loading: false,
};

export const getAllCourses = createAsyncThunk(
  "/courses/get",
  async (_, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.get("/courses", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      toast.promise(responsePromise, {
        loading: "Loading course data...",
        success: "Courses loaded successfully",
        error: "Failed to get the courses",
      });

      const response = await responsePromise;

      return response.data.courses; // ✅ only the array
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courseData = action.payload || [];
        
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload || "Failed to load courses");
      });
  },
});

export default courseSlice.reducer;
