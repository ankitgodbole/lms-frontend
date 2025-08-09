import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/AxiosInstance.js";
import isEmail from "../Helpers/regexMatcher.js";
import useDebounceInput from "../Hooks/useDebounceInput"; // Import the hook
import HomeLayout from "../Layouts/HomeLayout.jsx";

function ContactUs() {
  const [tempInput, setTempInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const debouncedInput = {
    name: useDebounceInput(tempInput.name),
    email: useDebounceInput(tempInput.email),
    subject: useDebounceInput(tempInput.subject),
    message: useDebounceInput(tempInput.message),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { email, name, message } = debouncedInput;

    if (!email || !name || !message) {
      toast.error("All fields are required!");
      return;
    }

    if (!isEmail(email)) {
      toast.error("Please Enter valid email address");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "submitting your message...",
        success: "message sent!",
        error: "Failed to send message!",
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setTempInput({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (e) {
      toast.error("Operation Failed.....", e.message);
    }
    console.log("Submitted data:", debouncedInput);
    toast.success("Message sent!");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen px-4 py-10 text-white">
        <form
          onSubmit={onFormSubmit}
          className="w-full max-w-xl bg-[#00000053] shadow-lg rounded-2xl p-6 sm:p-8"
        >
          <h1 className="text-3xl font-bold text-center text-white">
            Contact Us
          </h1>

          {["name", "email", "subject", "message"].map((field) => (
            <div key={field} className="space-y-1 mt-4">
              <label
                htmlFor={field}
                className="block text-sm font-semibold capitalize"
              >
                {field}
              </label>
              {field === "message" ? (
                <textarea
                  id={field}
                  name={field}
                  rows="5"
                  onChange={handleInputChange}
                  value={tempInput.field}
                  placeholder={`Your ${field}`}
                  className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
                />
              ) : (
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  onChange={handleInputChange}
                  value={tempInput.field}
                  placeholder={`Your ${field}`}
                  className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ContactUs;
