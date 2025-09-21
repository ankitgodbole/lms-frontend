import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const store = useSelector((store) => store?.auth);
  const { data, role } = store;

  // Destructure state safely
  const {
    _id: courseId,
    title = "Untitled Course",
    category = "General",
    createdBy = "Unknown Instructor",
    thumbnail,
    description = "No description available.",
    numberOfLectures = 0,
  } = state || {};

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }
  }, [state, navigate]);

  return (
    <HomeLayout>
      <div className="min-h-screen text-white px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Course Title Section */}
          <section className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
              {title}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              {description}
            </p>
          </section>

          {/* Course Preview Section */}
          <section className="w-full rounded-xl overflow-hidden shadow-md bg-gray-800">
            {thumbnail?.secure_url ? (
              <img
                src={thumbnail.secure_url}
                alt={title}
                className="w-full h-[70vh] object-cover"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center text-gray-500 text-xl">
                [ No Course Thumbnail ]
              </div>
            )}
          </section>

          {/* Course Details Section */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">
              What You’ll Learn
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-gray-300 text-sm sm:text-base">
              <li>Responsive web design with HTML, CSS, and JavaScript</li>
              <li>Build full-stack apps using React and Node.js</li>
              <li>Understand REST APIs & integrate front-end and back-end</li>
              <li>Host & deploy real-world applications on cloud</li>
            </ul>

            <div className="pt-4 text-sm text-gray-400">
              <p>
                <span className="font-semibold text-white">Lectures:</span>{" "}
                {numberOfLectures}
              </p>
              <p>
                <span className="font-semibold text-white">Category:</span>{" "}
                {category}
              </p>
            </div>
          </section>

          {/* Instructor Section */}
          <section className="bg-[#1e293b] p-6 sm:p-8 rounded-xl shadow-lg">
            <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-2">
              About the Instructor
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {createdBy} is a senior full-stack developer with over 10 years of
              experience, having mentored thousands of students and built
              scalable products across multiple industries.
            </p>
          </section>

          {/* Enroll Button */}
          {role === "ADMIN" || data?.subscription?.status === "active" ? (
            <div className="flex justify-center">
              <button
                onClick={() => navigate(`/courses/${courseId}/lectures`)}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 text-sm sm:text-base rounded-lg hover:bg-yellow-300 transition duration-200 shadow-md"
              >
                Watch Lectures
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/checkout")}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 text-sm sm:text-base rounded-lg hover:bg-yellow-300 transition duration-200 shadow-md"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
