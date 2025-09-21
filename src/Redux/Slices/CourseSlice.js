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

//for create course 

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data, { rejectWithValue }) => {
    const { title, description, category, createdBy, thumbnail } = data;

    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("createdBy", createdBy);
      formData.append("thumbnail", thumbnail);

      const responsePromise = axiosInstance.post("/courses", formData);

      toast.promise(responsePromise, {
        loading: "Creating new Course...",
        success: "Course created successfully!",
        error: "Failed to create course",
      });

      const response = await responsePromise;
      return response.data.course; // ✅ sirf ek course object return karo
    } catch (e) {
      const message = e?.response?.data?.message || "Failed to create course";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ Update course
export const updateCourse = createAsyncThunk(
  "/course/update",
  async ({ courseId, data }, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.put(`/courses/${courseId}`, data);

      toast.promise(responsePromise, {
        loading: "Updating course...",
        success: "Course updated successfully",
        error: "Failed to update course",
      });

      const response = await responsePromise;
      return response.data.course;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update course";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ Delete course
export const deleteCourse = createAsyncThunk(
  "/course/delete",
  async (courseId, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.delete(`/courses/${courseId}`);

      toast.promise(responsePromise, {
        loading: "Deleting course...",
        success: "Course deleted successfully",
        error: "Failed to delete course",
      });

      await responsePromise;
      return courseId; // for local state update
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete course";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all courses
      .addCase(getAllCourses.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllCourses.fulfilled, (state, action) => { state.loading = false; state.courseData = action.payload; })
      .addCase(getAllCourses.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Create course
      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.courseData.push(action.payload);
      })

      // Update course
      .addCase(updateCourse.fulfilled, (state, action) => {
        const idx = state.courseData.findIndex(c => c._id === action.payload._id);
        if (idx !== -1) state.courseData[idx] = action.payload;
      })

      // Delete course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courseData = state.courseData.filter(c => c._id !== action.payload);
      });
  },
});

 

export default courseSlice.reducer;
