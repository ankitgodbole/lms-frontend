import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";

export default function HomeLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* ✅ Large Screen Top-Left Menu Icon (outside header) */}
      {!isOpen && <button
        className="hidden lg:block fixed top-4 left-4 z-50 bg-[#415a77] text-white p-2 rounded-full shadow"
        onClick={toggleDrawer}
      >
        <FiMenu size={24} />
      </button>}

      {/* ✅ Header (Only for Small Screens) */}
      <header className="w-full bg-[#415a77] text-white flex items-center justify-between p-4 lg:hidden">
        <h1 className="text-xl font-bold">Header</h1>
        {/* Menu icon on right side for mobile */}
        <button
          className="p-2 rounded hover:bg-[#3b4d66]"
          onClick={toggleDrawer}
        >
          <FiMenu size={24} />
        </button>
      </header>

      {/* ✅ Main content area */}
      <div className="flex flex-grow bg-[#415a77]">
        {/* Sidebar Drawer */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-[#415a7791] text-white font-bold p-4 z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center  justify-between mb-6">
            <h2 className="font-bold  text-lg">Menu</h2>
            <button onClick={closeDrawer}>
              <AiFillCloseCircle size={24} />
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <Link to="/" onClick={closeDrawer}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/courses" onClick={closeDrawer}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/students" onClick={closeDrawer}>
                Students
              </Link>
            </li>
            <li>
              <Link to="/settings" onClick={closeDrawer}>
                Settings
              </Link>
            </li>
          </ul>
        </aside>

        {/* Overlay (for any screen) */}
        {isOpen && (
          <div
            className="fixed inset-0  bg-opacity-40 z-40"
            onClick={closeDrawer}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50 text-black z-0">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
