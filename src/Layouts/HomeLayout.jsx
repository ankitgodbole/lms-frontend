import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer.jsx";
import { logout } from "../Redux/Slices/AuthSlice.js";

export default function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for checking user logged in
  const isLoggedIn = useSelector((state) => {
    return state?.auth?.isLoggedIn;
  });

  //for displaying the options acc to role

  const role = useSelector((state) => {
    return state?.auth?.role;
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  //for logout functionality

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.type === "auth/logout/fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col   min-h-screen bg-gray-900">
      {/* ✅ Large Screen Top-Left Menu Icon (outside header) */}
      {!isOpen && (
        <button
          className="hidden lg:block fixed top-4 left-4 z-50 bg-[#415a77] text-white p-2 rounded-full shadow"
          onClick={toggleDrawer}
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* ✅ Header (Only for Small Screens) */}
      <header className="w-full bg-gray-800 text-white flex items-center justify-between p-4 lg:hidden">
        <h1 className="text-xl font-bold">Header</h1>
        {/* Menu icon on right side for mobile */}
        <button
          className="p-2 rounded hover:bg-[#3b4d66]"
          onClick={toggleDrawer}
        >
          <FiMenu size={24} />
        </button>
      </header>

      {/* ✅ Main content area */}
      <div className="flex flex-grow   bg-[#415a77]">
        {/* Sidebar Drawer */}
        <aside
          className={`fixed top-0 text-center   left-0 h-full w-64 bg-[#415a7791] text-black font-bold   p-4 z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center  justify-end mb-6">
            <button onClick={closeDrawer}>
              <AiFillCloseCircle size={24} />
            </button>
          </div>
          <ul className=" flex items-center  flex-col  space-y-1.5  ">
            <li className=" w-full bg-gray-700 rounded-md text-white text-center hover:bg-amber-50 hover:text-black py-1">
              <Link to="/" onClick={closeDrawer}>
                Home
              </Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li className=" w-full bg-gray-700 rounded-md text-white text-center hover:bg-amber-50 hover:text-black py-1">
                <Link to="/admin/dashboard" onClick={closeDrawer}>
                  Admin Dashboard
                </Link>
              </li>
            )}
            {isLoggedIn && role === "ADMIN" && (
              <li className=" w-full bg-gray-700 rounded-md text-white text-center hover:bg-amber-50 hover:text-black py-1">
                <Link to="/course/create" onClick={closeDrawer}>
                  Create New Course
                </Link>
              </li>
            )}
            <li className=" w-full bg-gray-700 rounded-md text-white text-center hover:bg-amber-50 hover:text-black py-1">
              <Link to="/courses" onClick={closeDrawer}>
                All Courses
              </Link>
            </li>
            <li className=" w-full bg-gray-700 rounded-md text-white text-center hover:bg-amber-50 hover:text-black py-1">
              <Link to="/contact-us" onClick={closeDrawer}>
                Contact Us
              </Link>
            </li>
            <li className=" w-full bg-gray-700 rounded-md text-white text-center hover:bg-amber-50 hover:text-black py-1">
              <Link to="/about-us" onClick={closeDrawer}>
                About Us
              </Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute bottom-10 w-[90%]">
                <div className="w-full flex lg:flex-row md:flex sm:flex-col  items-center justify-center gap-4 mt-4">
                  <Link to="/login">
                    <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md shadow-md transition-all duration-300">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-6 py-2 bg-white hover:bg-gray-100 text-black font-semibold border border-gray-300 rounded-md shadow-md transition-all duration-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex  items-center justify-center gap-4 mt-4">
                  <Link to="/user/profile">
                    <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md shadow-md transition-all duration-300">
                      Profile
                    </button>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-white hover:bg-gray-100 text-black font-semibold border border-gray-300 rounded-md shadow-md transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </aside>

        {/* Overlay (for any screen) */}
        {isOpen && (
          <div
            className="fixed inset-0  bg-opacity-40 z-40"
            onClick={closeDrawer}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 w-full bg-transparent  text-black z-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
