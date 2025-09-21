import { toast } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useEffect } from "react";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  console.log("user Data after success",userData);

  // Optional: Show a toast on mount to reinforce success
  useEffect(() => {
    toast.success("Welcome to your 1-year course subscription!");
  }, []);

  // Navigate to home or courses page
  const handleContinue = () => {
    navigate("/courses"); // Adjust to "/home" or other route as needed
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white px-4">
        <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-xl p-6 flex flex-col gap-6 text-center">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
          <h1 className="text-2xl font-bold text-yellow-500">
            Payment Successful!
          </h1>
          <p className="text-base">
            Congratulations, {userData?.fullName || "User"}! <br />
            Your 1-year subscription to all courses is now active.
          </p>
          <p className="text-sm text-gray-400">
            A confirmation has been sent to {userData?.email || "your email"}.
          </p>
          <button
            onClick={handleContinue}
            className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all duration-300 py-3 rounded-lg font-bold"
          >
            Explore Courses
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutSuccess;
