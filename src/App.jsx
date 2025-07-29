import { Route, Routes } from "react-router-dom";

import AboutUs from "./pages/AboutUs.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <>
    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        {/* <AppLayout/> */}
    
    </>
  );
}

export default App;
