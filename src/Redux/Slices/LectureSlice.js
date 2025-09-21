// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// import axiosInstance from "../../Helpers/AxiosInstance";

// const initialState = {
//   lectures: [],
//   isLoading: false,
//   error: null,
// };

// export const getLectures = createAsyncThunk(
//   "/course/lectures/get",
//   async (courseId, { rejectWithValue }) => {
//     try {
//       console.log("Fetching lectures for course:", courseId);
//       const res = await axiosInstance.get(`/courses/${courseId}`);
//       console.log("Course with lectures fetched:", res.data);
//       return res.data.course.lectures;
//     } catch (error) {
//       console.error("Error fetching lectures:", error);
//       toast.error(error?.response?.data?.message || "Failed to fetch lectures");
//       return rejectWithValue(
//         error?.response?.data?.message || "Failed to fetch lectures"
//       );
//     }
//   }
// );

// export const addCourseLectures = createAsyncThunk(
//   "/course/lectures/add",
//   async (courseId, { rejectWithValue }) => {
//     try {
//       console.log("Fetching lectures for course:", courseId);
//       const res = await axiosInstance.post(`/courses/${courseId}`);
//       console.log("Course with lectures fetched:", res );
//       return await res.data.course.lectures;
//     } catch (error) {
//       console.error("Error fetching lectures:", error);
//       toast.error(error?.response?.data?.message || "Failed to fetch lectures");
//       return rejectWithValue(
//         error?.response?.data?.message || "Failed to fetch lectures"
//       );
//     }
//   }
// );

// export const removeLecture = createAsyncThunk(
//   "lectures/delete",
//   async ({ courseId, lectureId }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.delete(
//         `/courses/${courseId}/lectures/${lectureId}`
//       );
//       return { courseId, lectureId }; // useful for updating state
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// const lectureSlice = createSlice({
//   name: "lectures",
//   initialState,
//   isLoading:false,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getLectures.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getLectures.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.lectures = action.payload;
//       })
//       .addCase(getLectures.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError } = lectureSlice.actions;
// export default lectureSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/AxiosInstance.js";

const initialState = {
  lectures: [],
  loading: false,
  error: null,
};

// ✅ Get lectures of a course
export const getLectures = createAsyncThunk(
  "/lectures/get",
  async (courseId, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.get(`/courses/${courseId}`);

      toast.promise(responsePromise, {
        loading: "Fetching lectures...",
        success: "Lectures fetched successfully",
        error: "Failed to fetch lectures",
      });

      const response = await responsePromise;
      return response.data.course.lectures;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch lectures";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// addLecture Thunk
export const addLecture = createAsyncThunk(
  "/lecture/add",
  async ({ courseId, data }, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("lecture", data.lecture);

      const responsePromise = axiosInstance.post(
        `/courses/${courseId}/lectures`,
        formData
      );

      toast.promise(responsePromise, {
        loading: "Adding lecture...",
        success: "Lecture added successfully",
        error: "Failed to add lecture",
      });

      const response = await responsePromise;
      return response.data.lecture; // ✅ sirf lecture
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to add lecture"
      );
    }
  }
);

// ✅ Update lecture
export const updateLecture = createAsyncThunk(
  "/lecture/update",
  async ({ courseId, lectureId, data }, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.put(
        `/courses/${courseId}/lectures/${lectureId}`,
        data
      );

      toast.promise(responsePromise, {
        loading: "Updating lecture...",
        success: "Lecture updated successfully",
        error: "Failed to update lecture",
      });

      const response = await responsePromise;
      return response.data.lecture; // updated lecture
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update lecture";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ Delete lecture
export const deleteLecture = createAsyncThunk(
  "/lecture/delete",
  async ({ courseId, lectureId }, { rejectWithValue }) => {
    try {
      const responsePromise = axiosInstance.delete(
        `/courses/${courseId}/lectures/${lectureId}`
      );

      toast.promise(responsePromise, {
        loading: "Deleting lecture...",
        success: "Lecture deleted successfully",
        error: "Failed to delete lecture",
      });

      await responsePromise;
      return lectureId; // local update ke liye
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to delete lecture";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get lectures
      .addCase(getLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(getLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //addLecture
      .addCase(addLecture.fulfilled, (state, action) => {
        state.lectures.push(action.payload); // ✅ state immediately update
      })
      // Update lecture
      .addCase(updateLecture.fulfilled, (state, action) => {
        const idx = state.lectures.findIndex(
          (l) => l._id === action.payload._id
        );
        if (idx !== -1) state.lectures[idx] = action.payload;
      })

      // Delete lecture
      .addCase(deleteLecture.fulfilled, (state, action) => {
        state.lectures = state.lectures.filter((l) => l._id !== action.payload);
      });
  },
});

export default lectureSlice.reducer;
