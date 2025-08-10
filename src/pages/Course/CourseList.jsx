import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../components/CourseCard.jsx";
import CourseSkeleton from "../../components/CourseSkeleton.jsx";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { getAllCourses } from "../../Redux/Slices/CourseSlice.js";

function CourseList() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { courseData } = useSelector((state) => state.course);

  useEffect(() => {
    async function fetchCourses() {
      await dispatch(getAllCourses());
      setIsLoading(false);
    }

    fetchCourses();
  }, [dispatch]);

  const filteredCourses = courseData?.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HomeLayout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-16  ">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm mb-8"
        >
          Explore Our Courses
        </motion.h1>

        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by course title..."
            className="w-full px-5 py-3 rounded-2xl bg-[#1f2937] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <CourseSkeleton key={index} />
              ))}
          </div>
        ) : filteredCourses?.length === 0 ? (
          <motion.p
            className="text-center text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No courses found.
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </HomeLayout>
  );
}

export default CourseList;
