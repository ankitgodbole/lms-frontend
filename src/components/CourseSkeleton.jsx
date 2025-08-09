function CourseSkeleton() {
  return (
    <div className="animate-pulse bg-[#1f1f1f] rounded-2xl shadow-lg overflow-hidden border border-gray-700">
      <div className="h-48 bg-gray-800 w-full"></div>
      <div className="p-5 space-y-4">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-8 bg-gray-700 rounded w-1/2 mt-4"></div>
      </div>
    </div>
  );
}

export default CourseSkeleton;
