// Checkout.jsx
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice.js";
import { getUserData } from "../../Redux/Slices/AuthSlice.js";

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  const [razorpayKey, setRazorpayKey] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`)) {
      if (window.Razorpay) setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () =>
      toast.error("Failed to load payment SDK. Check network or adblock.");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    async function fetchKey() {
      try {
        setIsLoading(true);
        const response = await dispatch(getRazorpayId()).unwrap();
        setRazorpayKey(response.key || "");
      } catch (error) {
        toast.error("Unable to load payment details. Please try again.");
        console.error("Error fetching Razorpay key:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchKey();
  }, [dispatch]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Creating subscription...");
      const subResponse = await dispatch(purchaseCourseBundle()).unwrap();
      const subId = subResponse.subscription_id;
      console.log("New Subscription ID:", subId);
      if (!subId) throw new Error("Subscription creation failed");

      setSubscriptionId(subId);

      if (!isScriptLoaded || !razorpayKey || !window.Razorpay) {
        toast.error("Payment system not ready. Try refreshing.");
        return;
      }

      const options = {
        key: razorpayKey,
        subscription_id: subId,
        name: "Coursify Pvt. Ltd.",
        description: "1-Year Course Subscription",
        handler: async (response) => {
          try {
            console.log("Razorpay Response:", response);
            const paymentDetails = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
            };
            console.log("Sending payment details:", paymentDetails);
            const verifyResponse = await dispatch(
              verifyUserPayment(paymentDetails)
            ).unwrap();
            console.log("Verify Response:", verifyResponse);
            if (verifyResponse.success) {
              await dispatch(getUserData()); // Refresh user data
              toast.success("Payment successful!");
              navigate("/checkout/success");
            } else {
              toast.error("Payment verification failed.");
              navigate("/checkout/fail");
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Verification failed. Please try again.");
            navigate("/checkout/fail");
          }
        },
        prefill: {
          name: userData?.fullName || "User",
          email: userData?.email || "user@example.com",
        },
        theme: { color: "#F37254" },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled.");
            navigate("/checkout/fail");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to start payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HomeLayout>
      <form
        onSubmit={handlePayment}
        className="min-h-[90vh] flex items-center justify-center text-white px-4"
      >
        <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-xl p-6 flex flex-col gap-6">
          <h1 className="bg-yellow-500 text-gray-900 text-center py-3 text-xl font-bold rounded-lg">
            Subscription Bundle
          </h1>
          <div className="text-center space-y-4">
            <p className="text-base">
              Access all courses for{" "}
              <span className="text-yellow-500 font-bold">1 Year</span>.
              <br />
              Includes all existing and new courses.
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> 499
            </p>
            <p className="text-gray-400 text-sm">100% refund on cancellation</p>
          </div>
          <button
            type="submit"
            disabled={isLoading || !isScriptLoaded || !razorpayKey}
            className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all duration-300 py-3 rounded-lg font-bold disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Buy Now"}
          </button>
        </div>
      </form>
    </HomeLayout>
  );
};

export default Checkout;
