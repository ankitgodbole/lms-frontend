import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice.js";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    const { email, password } = LoginData;

    // Basic presence check
    if (!email || !password) {
      toast.error("Please fill all the details");
      return;
    }

    // If all is valid:
    const loginData = {
      email: email,
      password: password,
    };

    // TODO: Dispatch Login action here
    const response = await dispatch(login(loginData));
    console.log(response);
    //if succesfully created access to homepage
    if (response?.payload?.success) {
      toast.success("Account created successfully! 🎉");
      navigate("/");
    } else {
      toast.error("Account creation failed");
    }

    //reset Login data
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <HomeLayout>
      <Toaster />
      <div className="w-full md:w-fit lg:w-[30%] m-auto mt-[10%] rounded-xl bg-[#ffffff] px-4 py-6 shadow-md">
        <form onSubmit={onLogin} className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold text-center">Login Form</h1>

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
              value={LoginData.email}
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
              value={LoginData.password}
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
            Login
          </button>
          <p>
            Don't have an accout ?
            <Link to="/signup" className="hover:underline  text-blue-600   ">
              {" "}
              create account
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default LoginPage;
