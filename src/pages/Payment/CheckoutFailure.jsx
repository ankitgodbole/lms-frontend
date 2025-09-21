import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";

const CheckoutFailure = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  // Show a toast on mount to reinforce failure
  useEffect(() => {
    toast.error("Payment failed or was cancelled. Please try again.");
  }, []);

  // Navigate to retry payment or home
  const handleRetry = () => {
    navigate("/checkout"); // Redirect to checkout to retry payment
  };

  const handleBackToHome = () => {
    navigate("/courses"); // Adjust to "/home" or other route as needed
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white px-4">
        <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-xl p-6 flex flex-col gap-6 text-center">
          <FaTimesCircle className="text-red-500 text-5xl mx-auto" />
          <h1 className="text-2xl font-bold text-yellow-500">Payment Failed</h1>
          <p className="text-base">
            Sorry, {userData?.fullName || "User"}, your payment could not be
            processed or was cancelled.
            <br />
            Please try again or contact support if the issue persists.
          </p>
          <p className="text-sm text-gray-400">
            Email: {userData?.email || "support@coursify.com"}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all duration-300 py-2 px-4 rounded-lg font-bold"
            >
              Retry Payment
            </button>
            <button
              onClick={handleBackToHome}
              className="bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300 py-2 px-4 rounded-lg font-bold"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutFailure;
