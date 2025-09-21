// src/pages/LectureList.jsx

import React, { useEffect, useState } from "react";
import { BsBook } from "react-icons/bs"; // Book icon
import { FiPlayCircle } from "react-icons/fi"; // Play icon
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { getLectures } from "../../Redux/Slices/LectureSlice.js";

const LectureList = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [search, setSearch] = useState("");

  const {
    lectures = [],
    isLoading,
    error,
  } = useSelector((state) => state.lecture || {});

  useEffect(() => {
    if (courseId) {
      dispatch(getLectures(courseId));
    }
  }, [dispatch, courseId]);

  if (isLoading) {
    return (
      <p className="text-center text-gray-600 animate-pulse mt-10">
        Loading lectures...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Filter lectures by search
  const filteredLectures = lectures.filter((lec) =>
    lec.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <HomeLayout>
      <div className="p-6">
        <h1 className="text-3xl text-center font-bold mb-6">📚 Lectures</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search lectures..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {filteredLectures.length > 0 ? (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLectures.map((lec) => (
              <li
                key={lec._id}
                className="p-5 bg-gray-900 border rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full text-yellow-600 text-2xl group-hover:scale-110 transition">
                    {lec.lecture?.secure_url ? <FiPlayCircle /> : <BsBook />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-lg text-gray-400 font-semibold group-hover:text-yellow-600 transition">
                      {lec.title}
                    </h2>
                    <p className="text-gray-200 text-sm mt-1 line-clamp-2">
                      {lec.description}
                    </p>

                    {lec.lecture?.secure_url && (
                      <Link
                        to={`/course/${courseId}/lecture/${lec._id}`}
                        className="inline-flex items-center gap-1 mt-3 text-blue-500 hover:text-blue-600 font-medium"
                      >
                        ▶ View Lecture
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-illustration-download-in-svg-png-gif-file-formats--empty-result-flat-design-pack-illustrations-4425796.png"
              alt="No lectures"
              className="w-60 mb-6"
            />
            <p className="text-lg font-medium">
              No lectures found for this course.
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default LectureList;
