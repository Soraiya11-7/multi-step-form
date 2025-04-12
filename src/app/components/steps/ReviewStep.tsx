import React from "react";
import { UseFormWatch } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
  FaCity,
  FaMailBulk,
  FaUserCircle,
  FaKey,
} from "react-icons/fa";

type FormData = z.infer<typeof formSchema>;

interface ReviewStepProps {
  watch: UseFormWatch<FormData>;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ watch }) => {
  const formData = watch();

  return (
    <div className="p-3 md:p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] hover:border hover:border-purple-400">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Review Your Information
      </h2>

      <div className="space-y-4 md:space-y-6">
        {/* Personal Information............... */}
        <div className="transition-all duration-300 hover:scale-[1.02]">
          <h3 className="font-semibold text-lg md:text-xl mb-2 md:mb-3 flex items-center gap-1 md:gap-2 text-gray-700 dark:text-gray-200">
            <FaUser className="text-purple-500 dark:text-gray-200" /> Personal Information
          </h3>
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 space-y-2">
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaUserCircle className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Full Name:</span> {formData.personalInfo.fullName}
            </p>
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaEnvelope className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Email:</span> {formData.personalInfo.email}
            </p>
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaPhone className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Phone:</span> {formData.personalInfo.phone}
            </p>
          </div>
        </div>

        {/* Address Details............ */}
        <div className="transition-all duration-300 hover:scale-[1.02]">
          <h3 className="font-semibold text-lg md:text-xl mb-2 md:mb-3 flex items-center gap-1 md:gap-2 text-gray-700 dark:text-gray-200">
            <FaMapMarkedAlt className="text-purple-500 dark:text-gray-200" /> Address Details
          </h3>
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 space-y-2">
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaMapMarkedAlt className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Street:</span> {formData.address.street}
            </p>
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaCity className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">City:</span> {formData.address.city}
            </p>
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaMailBulk className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Zip Code:</span> {formData.address.zipCode}
            </p>
          </div>
        </div>

        {/* Account Information .............*/}
        <div className="transition-all duration-300 hover:scale-[1.02]">
          <h3 className="font-semibold text-lg md:text-xl mb-2 md:mb-3 flex items-center gap-1 md:gap-2 text-gray-700 dark:text-gray-200">
            <FaUserCircle className="text-purple-500 dark:text-gray-200" /> Account Information
          </h3>
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 space-y-2">
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaUser className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Username:</span> {formData.account.username}
            </p>
            <p className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
              <FaKey className="text-purple-500 dark:text-purple-400" />
              <span className="font-medium">Password:</span> ********
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
