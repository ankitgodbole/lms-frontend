import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import HomeLayout from "../../Layouts/HomeLayout";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.data);

  const [data, setData] = useState({
    previewImage: user?.avatar?.secure_url || "",
    fullName: user?.fullName || "",
    avatar: null,
  });

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = () => {
        setData({
          ...data,
          previewImage: fileReader.result,
          avatar: uploadedImage,
        });
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are required");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    if (data.avatar) formData.append("avatar", data.avatar);

    const result1 = await dispatch(updateProfile(formData));
    console.log("Update profile result:", result1);
    const result = await dispatch(getUserData());
    console.log("User data:", result);
  };

  // Navigate back to profile or previous page
  const handleBack = () => {
    navigate(-1); // Go back to previous page, or use "/profile" or "/courses" if preferred
  };

  return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#657b95bb] rounded-2xl shadow-xl p-6 text-center relative">
          {/* Back Arrow Button */}
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 transition"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Profile
          </h2>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-6">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-2">
              <label
                htmlFor="image_uploads"
                className="cursor-pointer hover:opacity-80 transition"
              >
                {data.previewImage ? (
                  <img
                    src={data.previewImage}
                    alt="Preview"
                    className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-sm"
                  />
                ) : (
                  <BsPersonCircle className="w-28 h-28 text-gray-400" />
                )}
              </label>
              <input
                type="file"
                id="image_uploads"
                accept=".jpg,.jpeg,.png,.svg"
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-sm text-gray-500">Click to upload image</p>
            </div>

            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
