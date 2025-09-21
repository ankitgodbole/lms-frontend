import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice.js";
import courseReducer from "./Slices/CourseSlice.js";
import lectureReducer from "./Slices/LectureSlice.js";
import razorpayReducer from "./Slices/RazorpaySlice.js";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    razorpay: razorpayReducer,
    course: courseReducer,
    lecture : lectureReducer
  },

  devTools: true,
});

export default store;
