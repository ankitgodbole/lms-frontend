import { Route, Routes } from "react-router-dom";

import NotFound from "./components/NotFound.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/Signup.jsx";

function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
