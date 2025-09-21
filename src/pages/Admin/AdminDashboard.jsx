import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../components/Admin/AdminCourseCard.jsx";
import AnalyticsCard from "../../components/Admin/AnalyticsCard.jsx";
import LectureCard from "../../components/Admin/LectureCard.jsx";
import UserCard from "../../components/Admin/UserCard.jsx";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice.js";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { courseData, loading } = useSelector((state) => state.course);

  const [activeTab, setActiveTab] = useState("courses");

  useEffect(() => {
    if (activeTab === "courses") dispatch(getAllCourses());
  }, [dispatch, activeTab]);

  const handleDeleteCourse = async (id) => {
    await dispatch(deleteCourse(id));
    dispatch(getAllCourses());
  };

  return (
    <HomeLayout>
      {" "}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-white w-full">
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          {["courses", "lectures", "users", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              } capitalize`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Section Rendering */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-40 bg-gray-700 rounded-lg animate-pulse"
                    />
                  ))
              : courseData.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onDelete={() => handleDeleteCourse(course._id)}
                    onEdit={() => alert("Edit course: " + course.title)}
                  />
                ))}
          </div>
        )}

        {activeTab === "lectures" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map lecture data */}
            <LectureCard
              lecture={{ title: "React Basics", courseTitle: "Frontend" }}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        )}

        {activeTab === "users" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <UserCard
              user={{
                name: "Ankit",
                role: "Admin",
                email: "ankit@example.com",
              }}
              onEdit={() => {}}
              onDeactivate={() => {}}
            />
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnalyticsCard title="Total Courses" value={courseData.length} />
            <AnalyticsCard title="Total Users" value={50} />
            <AnalyticsCard title="Active Lectures" value={120} />
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
