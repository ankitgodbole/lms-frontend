// components/LectureCard.jsx
export default function LectureCard({ lecture, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
      <div>
        <h4 className="font-semibold text-lg text-yellow-400">
          {lecture.title}
        </h4>
        <p className="text-gray-300 text-sm">{lecture.courseTitle}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
