import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { createNewCourse } from "../../Redux/Slices/CourseSlice.js";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setUserInput((prev) => ({
          ...prev,
          previewImage: fileReader.result,
          thumbnail: uploadedImage,
        }));
      };
      fileReader.readAsDataURL(uploadedImage);
    }
  };

  // ✅ Handle Text Inputs
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle Submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { title, description, category, createdBy, thumbnail } = userInput;

    if (!title || !description || !category || !createdBy || !thumbnail) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      toast.success("Course Created Successfully!");
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  };

  return (
    <HomeLayout>
      <div className="max-w-4xl  mx-auto px-4 py-10 ">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Create New Course
        </h1>

        <form
          onSubmit={onFormSubmit}
          className="grid lg:grid-cols-2 gap-8 bg-gray-800 rounded-xl shadow-lg p-6"
        >
          {/* Left Side - Form Fields */}
          <div className="space-y-1">
            <div>
              <label className="block text-gray-300 mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                value={userInput.title}
                onChange={handleUserInput}
                placeholder="Enter course title"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                value={userInput.description}
                onChange={handleUserInput}
                placeholder="Enter course description"
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={userInput.category}
                onChange={handleUserInput}
                placeholder="e.g. Web Development"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Created By</label>
              <input
                type="text"
                name="createdBy"
                value={userInput.createdBy}
                onChange={handleUserInput}
                placeholder="Instructor Name"
                className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md transition-all"
            >
              Create Course
            </button>
          </div>

          {/* Right Side - Image Preview */}
          <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg border border-gray-700">
            {userInput.previewImage ? (
              <img
                src={userInput.previewImage}
                alt="Course Thumbnail Preview"
                className="rounded-lg w-full max-h-[400px] object-cover"
              />
            ) : (
              <div className="text-gray-500 italic">No image selected</div>
            )}
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
