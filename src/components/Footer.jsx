import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <footer className="bg-[#415a77] text-white w-full px-4 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <p className="text-sm md:text-base text-gray-300 text-center md:text-left">
          © {year}  All rights reserved.
        </p>

        {/* Right: Social Links */}
        <div className="flex gap-6 justify-center md:justify-end text-2xl">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-yellow-400 transition-colors"
          >
            <BsFacebook />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-yellow-400 transition-colors"
          >
            <BsInstagram />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-yellow-400 transition-colors"
          >
            <BsLinkedin />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-yellow-400 transition-colors"
          >
            <BsTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
