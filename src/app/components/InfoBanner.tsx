"use client";

import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";

export default function InfoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`relative mb-8 p-4 pr-10 rounded-lg text-center transition-opacity duration-300 dark:bg-gray-800 bg-white shadow-md`}
    >
      {/* Close button.......... */}
      <button
        onClick={() => setIsVisible(false)}
        className={`absolute top-3 right-3 p-1 rounded-full transition-transform hover:scale-110 active:scale-95 dark:hover:bg-gray-700/50 hover:bg-gray-100`}
        aria-label="Close banner"
      >
        <HiOutlineX className={`h-5 w-5 dark:text-gray-300 text-gray-500`} />
      </button>

      <p className={`dark:text-gray-300 text-purple-800`}>
        Please complete all steps to submit your information.
        This should take less than 2 minutes.
      </p>
    </div>
  );
}