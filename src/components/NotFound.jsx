import { useNavigate } from "react-router-dom";

// src/pages/NotFound.jsx
function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white text-center">
      <h1 className="text-8xl tracking-widest font-bold  animate-bounce">404</h1>
      <p className="text-xl mt-4">Oops! Page Not Found</p>
      <a
          onClick={()=> navigate(-1)}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded transition-all duration-300"
      >
        Go Back 
      </a>
    </div>
  );
}

export default NotFound;
