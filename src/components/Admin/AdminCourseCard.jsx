
 
// components/CourseCard.jsx
export default function CourseCard({ course, onDelete, onEdit }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-105">
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg sm:text-xl mb-2 text-yellow-400">
          {course.title}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base flex-1">
          {course.description}
        </p>
      </div>
      <div className="flex justify-between items-center p-4 border-t border-gray-700">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 text-sm sm:text-base"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 text-sm sm:text-base"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
