import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
  return (
    <div className="py-5 w-full flex justify-center space-x-4 items-center px-5 shadow-lg">
      <a
        href="mailto:nanakobby2002@gmail.com"
        target="_blank"
        className="hover:text-gray-400 transition"
      >
        <HiOutlineMail size={24} />
      </a>
      <a
        href="https://twitter.com/kay_dev24"
        target="_blank"
        className="hover:text-gray-400 transition"
      >
        <FaXTwitter size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/justice-duah-7ab6b4239/"
        target="_blank"
        className="hover:text-gray-400 transition"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href="https://wa.me/233547099317"
        target="_blank"
        className="hover:text-gray-400 transition"
      >
        <IoLogoWhatsapp size={24} />
      </a>
    </div>
  );
}
export default Footer;
