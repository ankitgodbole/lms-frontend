// components/AnalyticsCard.jsx
export default function AnalyticsCard({ title, value, color }) {
  return (
    <div
      className={`bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-300`}
    >
      <h3 className={`text-xl font-bold ${color || "text-yellow-400"}`}>
        {value}
      </h3>
      <p className="text-gray-300">{title}</p>
    </div>
  );
}
