import { Route, Routes } from "react-router-dom";

import ContactUs from "./components/ContactUs.jsx";
import NotFound from "./components/NotFound.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import RequireAuth from "./pages/auth/RequireAuth.jsx";
import CourseDescription from "./pages/Course/CourseDescription.jsx";
import CourseList from "./pages/Course/CourseList.jsx";
import CreateCourse from "./pages/Course/CreateCourse.jsx";
import Denied from "./pages/Denied.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/Signup.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/denied" element={<Denied />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
           
        </Route>
      </Routes>
    </>
  );
}

export default App;
