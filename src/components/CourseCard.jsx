import { Link, useNavigate } from "react-router-dom";

function CourseCard({ course }) {
  const navigate = useNavigate();
  const {
    thumbnail,
    description,
    category,
    createdBy,
    numberOfLectures,
    title,
    _id,
  } = course;

  return (
    <div
      onClick={() => navigate(`/course/description/`,{state : {...course}})}
      className="bg-[#1e293b] cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-700 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
    >
      <img
        src={thumbnail.secure_url}
        alt={title}
        className="w-full h-44 sm:h-52 md:h-56 lg:h-60 object-cover rounded-t-xl"
      />

      <div className="p-3 sm:p-4 space-y-3">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>

        <p className="text-gray-400 text-sm sm:text-base line-clamp-3">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 bg-[#2f3542] p-3 rounded-xl">
          <p className="text-gray-400 text-sm font-semibold">
            <span className="text-white">Category:</span>{" "}
            <span className="uppercase">{category}</span>
          </p>
          <p className="text-gray-400 text-sm font-semibold">
            <span className="text-white">Instructor:</span>{" "}
            <span className="capitalize">{createdBy}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 items-center">
          <Link
            to={`/course/${_id}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm sm:text-base px-4 py-2 rounded transition w-full sm:w-auto text-center"
          >
            View Details
          </Link>

          <span
            className="bg-yellow-500 text-black font-semibold
            text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2
            rounded transition w-full sm:w-auto text-center"
          >
            Total Lecture: {numberOfLectures}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
