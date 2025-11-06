import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* --- Company Info --- */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Novelity</h2>
          <p className="text-gray-400 leading-7">
            Your digital bookstore for modern readers. Discover, explore, and
            buy your favorite books — all in one place.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/"
                className="hover:text-lime-400 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-lime-400 transition-colors duration-300"
              >
                Shop Books
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-lime-400 transition-colors duration-300"
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-lime-400 transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* --- Contact Info --- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3">
            <li>
              <span className="block">📍 Kolkata, India</span>
            </li>
            <li>
              <span className="block">📧 support@novelity.com</span>
            </li>
            <li>
              <span className="block">📞 +91 9749404582</span>
            </li>
          </ul>
        </div>

        {/* --- Social Media --- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-lime-500 transition-all duration-300"
            >
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-lime-500 transition-all duration-300"
            >
              <i className="fab fa-twitter text-white"></i>
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-lime-500 transition-all duration-300"
            >
              <i className="fab fa-instagram text-white"></i>
            </a>
            <a
              href="#"
              className="p-3 bg-gray-800 rounded-full hover:bg-lime-500 transition-all duration-300"
            >
              <i className="fab fa-linkedin-in text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white">Novelity</span> — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
