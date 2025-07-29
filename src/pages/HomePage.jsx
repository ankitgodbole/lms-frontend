import { Link } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout.jsx";

export default function HomePage() {
  return (
    <HomeLayout>
      <div className="flex flex-col min-h-[80vh] lg:min-h-[85vh] justify-center items-center px-4 lg:px-20">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Find out the best
              <span className="text-yellow-400"> Online Courses</span>
            </h1>
            <p className="   text-gray-100 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0">
              Learn from expert instructors and gain valuable skills. Start your
              journey now and boost your career with high-quality online
              content.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link to="/contact-us">
                <button className="  px-6 py-3  bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md shadow-md transition-all">
                  Conctact Us
                </button>
              </Link>
              <Link to="/explore-courses" >
                <button className="px-6 py-3 hover:bg-[#4d4d4d]  bg-gray-800 text-white font-semibold rounded-md shadow-md transition-all">
                  Explore Courses
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center px-4 lg:px-8">
            <img
              src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg"
              alt="Online Learning"
              className="max-w-full h-auto rounded-xl shadow-xl object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
