"use client"
import Image from "next/image";
import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 border-b">
          <Image src='/SN LOGO.svg' width={160} height={100} alt="Logo" />

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-primary hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-primary hover:text-gray-500/75"
                    href="/upload"
                  >
                    Upload
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-primary hover:text-gray-500/75"
                    href="/about-us"
                  >
                    About Us
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-primary hover:text-gray-500/75"
                    href="/contact-us"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  href="/upload"
                >
                  Get Started
                </a>
              </div>

              <button
                onClick={toggleMenu}
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 w-64 h-full bg-white shadow-lg z-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <Image src="/logo.png" onClick={closeMenu} width={100} height={60} alt="Logo" className="object-contain" />
              <button
                onClick={closeMenu}
                className="text-gray-700 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <a
                onClick={closeMenu}
                href="/"
                className="text-gray-700 hover:text-gray-900"
              >
                Home
              </a>
              <a
                onClick={closeMenu}
                href="/upload"
                className="text-gray-700 hover:text-gray-900"
              >
                Upload
              </a>
              <a
                onClick={closeMenu}
                href="/about-us"
                className="text-gray-700 hover:text-gray-900"
              >
                About Us
              </a>
              <a
                onClick={closeMenu}
                href="/contact-us"
                className="text-gray-700 hover:text-gray-900"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
