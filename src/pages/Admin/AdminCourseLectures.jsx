// src/pages/AdminCourseLectures.jsx

import React, { useEffect, useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import {
  addLecture,
  deleteLecture,
  getLectures,
} from "../../Redux/Slices/LectureSlice.js";

const AdminCourseLectures = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { lectures = [], isLoading } = useSelector(
    (state) => state.lecture || {}
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Fetch lectures on mount
  useEffect(() => {
    if (courseId) {
      dispatch(getLectures(courseId));
    }
  }, [dispatch, courseId]);

  // Handle new lecture submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file) return alert("Title & file required!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("lecture", file);

    dispatch(addLecture({ courseId, formData }));

    setTitle("");
    setDescription("");
    setFile(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this lecture?")) {
      dispatch(deleteLecture({ courseId, lectureId: id }));
    }
  };

  return (
    <HomeLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">📚 Manage Lectures</h1>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-8"
        >
          <h2 className="text-lg font-semibold mb-4">Add New Lecture</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Lecture Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              placeholder="Lecture Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="file"
              accept="video/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600"
            />

            {file && (
              <p className="text-sm text-green-600">📂 Selected: {file.name}</p>
            )}

            <button
              type="submit"
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
            >
              <FiUpload /> Upload Lecture
            </button>
          </div>
        </form>

        {/* Lectures Table */}
        <h2 className="text-lg font-semibold mb-3">All Lectures</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : lectures.length > 0 ? (
          <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow">
            {lectures.map((lec) => (
              <li
                key={lec._id}
                className="flex justify-between items-center p-4 hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{lec.title}</h3>
                  <p className="text-sm text-gray-500">{lec.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(lec._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No lectures found.</p>
        )}
      </div>
    </HomeLayout>
  );
};

export default AdminCourseLectures;
