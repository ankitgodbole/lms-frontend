import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import isEmail from "../Helpers/regexMatcher.js";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import { createAccount } from "../Redux/Slices/AuthSlice";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSignupData((prev) => ({
      ...prev,
      avatar: file,
    }));

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreviewImage(reader.result);
  };

  const createNewAccount = async (e) => {
    e.preventDefault();

    const { fullName, email, password, avatar } = signupData;

    // Basic presence check
    if (!fullName || !email || !password || !avatar) {
      toast.error("Please fill all the details");
      return;
    }

    // Name validation
    if (fullName.trim().length < 5) {
      toast.error("Full Name must be at least 5 characters long");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    // Password validation (min 6 chars, one number)

    // If all is valid:
    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    // TODO: Dispatch signup action here
    const response = dispatch(createAccount(formData));
    console.log(response);
    //if succesfully created access to homepage
    if (response?.payload?.success) {
      toast.success("Authentication successll! 🎉");
      navigate("/");
    } else {
      toast.error("Authentication failed");
    }

    //reset signup data
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  };

  return (
    <HomeLayout>
      <Toaster />
      <div className="w-full md:w-fit lg:w-[30%] m-auto mt-6 rounded-xl bg-[#ffffff] px-4 py-6 shadow-md">
        <form
          onSubmit={createNewAccount}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-2xl font-semibold text-center">
            Registration Form
          </h1>

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <label htmlFor="image_uploads" className="cursor-pointer">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-gray-500" />
              )}
            </label>
            <input
              type="file"
              id="image_uploads"
              accept=".jpg,.jpeg,.png,.svg"
              className="hidden"
              onChange={getImage}
            />
          </div>

          {/* Full Name */}
          <div className="w-full">
            <label className="block font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name..."
              className="w-full px-3 py-2 border rounded"
              value={signupData.fullName}
              onChange={handleUserInput}
              required
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="w-full px-3 py-2 border rounded"
              value={signupData.email}
              onChange={handleUserInput}
              required
            />
          </div>

          {/* Password */}
          <div className="w-full relative">
            <label className="block font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="w-full px-3 py-2 pr-10 border rounded"
              value={signupData.password}
              onChange={handleUserInput}
              required
            />

            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-9 right-3 text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-black transition"
          >
            Create Account
          </button>
          <p>
            Already have an accout ?
            <Link to="/login" className="hover:underline">
              {" "}
              login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignupPage;
