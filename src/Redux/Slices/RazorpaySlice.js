import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
};

export const getRazorpayId = createAsyncThunk(
  "razorpay/getId",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/payments/razorpay-key");
      return res.data;
    } catch (error) {
      console.error("Error fetching Razorpay key:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get Razorpay key"
      );
    }
  }
);

export const purchaseCourseBundle = createAsyncThunk(
  "razorpay/purchaseCourse",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payments/subscribe");
      console.log("Purchase Course Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error creating subscription:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create subscription"
      );
    }
  }
);
export const verifyUserPayment = createAsyncThunk(
  "razorpay/verifyPayment",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Sending verification request:", data);
      const response = await axiosInstance.post(
        "/payments/verify-subscription",
        {
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_subscription_id: data.razorpay_subscription_id,
          razorpay_signature: data.razorpay_signature,
        }
      );
      console.log("Verification response:", response.data);
      toast.success("Payment verified successfully");
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Payment verification failed");
      return rejectWithValue(
        error?.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  "razorpay/cancelSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/payments/unsubscribe");
      return res.data;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      return rejectWithValue(
        error?.response?.data?.message || "Failed to cancel subscription"
      );
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action.payload.key || "";
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action.payload.subscription_id || "";
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        state.isPaymentVerified = action.payload.success || false;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.subscription_id = "";
        state.isPaymentVerified = false;
      });
  },
});

export default razorpaySlice.reducer;
