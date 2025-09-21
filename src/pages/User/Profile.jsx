import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { getUserData } from "../../Redux/Slices/AuthSlice.js";
import { cancelSubscription } from "../../Redux/Slices/RazorpaySlice.js";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  const handleCancelSubscription = async () => {
    try {
      await dispatch(cancelSubscription()).unwrap();
      await dispatch(getUserData()); // Refresh user data
      navigate("/");
    } catch (error) {
      console.error("Cancel subscription error:", error);
    }
  };
  console.log(userData);
  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Overlay */}
        <div className="absolute inset-0"></div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full m-3
                     max-w-md sm:max-w-lg md:max-w-xl lg:max-w-xl 
                     p-6 sm:p-8 md:p-10 
                     rounded-2xl shadow-xl border border-white/20 
                     bg-white/10 backdrop-blur-xl text-white"
        >
          {/* Back Arrow */}
          <Link
            to={"/"}
            className="absolute  top-4 left-4 p-2 rounded-full hover:bg-white/20 transition"
          >
            <MdArrowBack className="w-5 h-5 cursor-pointer sm:w-6 sm:h-6" />
          </Link>

          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <motion.img
              src={userData?.avatar?.secure_url}
              alt="Profile"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 
                         rounded-full border-4 border-white shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-center">
              {userData?.fullName || "John Doe"}
            </h2>
          </div>

          {/* Profile Details */}
          <div className="mt-6 space-y-4 text-sm sm:text-base md:text-lg">
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Email</span>
              <span className="text-gray-300">
                {userData?.email || "user@example.com"}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Role</span>
              <span className="text-gray-300">
                {userData?.role || "STUDENT"}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Subscription</span>
              <span className="text-gray-300">
                {userData?.subscription?.status == "active"
                  ? "Action"
                  : "Inactive"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/user/editprofile"
              className="flex-1 text-center bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Edit Profile
            </Link>
            <Link
              to="/changepassword"
              className="flex-1 text-center bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Change Password
            </Link>
          </div>
          {userData?.subscription?.status === "created" && (
            <div>
              <button
                onClick={() => {
                  handleCancelSubscription();
                }}
                className="flex-1 mt-3 w-full text-center bg-red-500 text-black py-2 rounded-lg font-semibold hover:bg-red-400 transition"
              >
                Cancel Subscription
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
