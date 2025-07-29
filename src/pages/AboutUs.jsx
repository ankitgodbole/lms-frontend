import { FaChalkboardTeacher, FaCode, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

import TeamCarousel from "../components/TeamCarousel.jsx";
import HomeLayout from "../Layouts/HomeLayout.jsx";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="bg-base-100  text-base-content">
        {/* About Us – Hero Section */}
        <section className="bg-[#0d111772] text-white py-20 px-6 md:px-24 rounded-b-3xl shadow-xl">
          <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            {/* Text Content */}
            <div className="text-center md:text-left flex-1 space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                About CrackCampus
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200    font-medium max-w-xl">
                We are a passionate student-led initiative dedicated to
                simplifying placement preparation. Our mission is to bridge the
                gap between classroom learning and real-world hiring — by
                providing curated resources, practical tools, and peer-driven
                support.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl">
                Whether you're brushing up on DSA, exploring career paths, or
                tracking your progress — CrackCampus is your trusted partner on
                the journey from planning to placement.
              </p>
              <div className="inline-block bg-yellow-400 hover:bg-yellow-500 text-[#0d1117] font-semibold py-3 px-6 rounded-full shadow-md transition duration-300">
                <Link to="/courses">Explore Resources</Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex-1">
              <img
                src="https://img.freepik.com/free-photo/businesspeople-meeting-office-working-together_23-2148908923.jpg?ga=GA1.1.591620036.1740916107&semt=ais_hybrid&w=740&q=80"
                alt="Teamwork and learning"
                className="w-full rounded-4xl   max-w-md mx-auto drop-shadow-xl"
              />
            </div>
          </div>
        </section>
        {/* Who We Are */}
        <section className="bg-[#0d111772] my-20 rounded-4xl text-white py-20 px-6 md:px-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
            {/* Illustration */}
            <div className="flex-1">
              <TeamCarousel />
            </div>
            {/* Text Content */}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Who We Are
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                We’re a driven team of student developers from{" "}
                <span className="text-yellow-400 font-semibold">
                  IIIT Bhopal
                </span>
                , united by a single vision — to revolutionize placement
                preparation for students like us.
                <br />
                CrackCampus is our way of making learning
                <span className="text-yellow-300 font-medium"> smart</span>,
                <span className="text-yellow-300 font-medium"> free</span>, and
                <span className="text-yellow-300 font-medium">
                  {" "}
                  accessible
                </span>{" "}
                — especially for
                <span className="text-yellow-400"> RGPV University</span>{" "}
                students.
              </p>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  to="/our-story"
                  className="inline-block text-sm sm:text-base bg-yellow-400 hover:bg-yellow-500 text-[#0d1117] font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
                >
                  Read Our Story
                </Link>
              </div>
            </div>
          </div>

          {/* Optional Glow */}
          <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-yellow-400 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        </section>

        {/* What We Offer */}
        <section className="bg-gray-700 py-16 px-4 md:px-20 rounded-3xl">
          <h2 className="text-2xl md:text-3xl text-gray-100 font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#7d9ec5b8] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
              <FaLightbulb className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-2">
                Curated Resources
              </h3>
              <p className="text-sm md:text-base text-gray-100">
                Handpicked notes, sheets, and strategies for Aptitude, DSA, OS,
                DBMS & CN.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#7d9ec5b8] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
              <FaCode className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl text-gray-100 font-semibold mb-2">
                DSA Tracker
              </h3>
              <p className="text-sm md:text-base text-gray-100">
                Solve topic-wise problems and track your progress — no login
                needed.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#7d9ec5b8] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
              <FaChalkboardTeacher className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-lg md:text-xl text-gray-100 font-semibold mb-2">
                Placement Guidance
              </h3>
              <p className="text-sm md:text-base text-gray-100">
                Get tips on resume building, project ideas, and real interview
                experiences.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Crack Your Campus Placements?
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Join us and kickstart your placement journey with confidence and the
            right tools.
          </p>
          <Link
            to="/signup"
            className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md shadow-md transition-all"
          >
            Get Started Now
          </Link>
        </section>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
