"use client";

import { useEffect } from "react";
import { FaRegSmile } from "react-icons/fa";

interface WelcomeModalProps {
  onClose: () => void;
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 dark:bg-gray-900/90 bg-gray-100/90`}
    >
      <div
        className={`p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center flex flex-col justify-center items-center space-y-6 dark:bg-gray-800 dark:text-white bg-white text-gray-900
    `}
      >
        {/* Welcome Icon */}
        <div className="text-5xl text-purple-500 mx-auto ">
          <FaRegSmile />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold">Welcome!</h2>

        {/* Message */}
        <p className="text-base">
          Thank you for visiting our website. You will be redirected to the form shortly.
        </p>
      </div>
    </div>
  );
}
