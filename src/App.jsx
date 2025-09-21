import { Route, Routes } from "react-router-dom";

import ContactUs from "./components/ContactUs.jsx";
import NotFound from "./components/NotFound.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import AdminCourseLectures from "./pages/Admin/AdminCourseLectures.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import RequireAuth from "./pages/auth/RequireAuth.jsx";
import CourseDescription from "./pages/Course/CourseDescription.jsx";
import CourseList from "./pages/Course/CourseList.jsx";
import CreateCourse from "./pages/Course/CreateCourse.jsx";
import Denied from "./pages/Denied.jsx";
import HomePage from "./pages/HomePage.jsx";
import LectureDetail from "./pages/Lecture/LectureDetail.jsx";
import LectureList from "./pages/Lecture/LectureList.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Checkout from "./pages/Payment/Checkout.jsx";
import CheckoutFailure from "./pages/Payment/CheckoutFailure.jsx";
import CheckoutSuccess from "./pages/Payment/CheckoutSuccess.jsx";
import SignupPage from "./pages/Signup.jsx";
import EditProfile from "./pages/User/EditProfile.jsx";
import Profile from "./pages/User/Profile.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route
          path="/admin/course/:courseId/lectures"
          element={<AdminCourseLectures />}
        />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:courseId/lectures" element={<LectureList />} />
        <Route
          path="/course/:courseId/lecture/:lectureId"
          element={<LectureDetail />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/user/editprofile" element={<EditProfile />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
