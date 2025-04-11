import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>;

interface PersonalInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ register, errors }) => {
  return (
    <div className={`p-6 rounded-lg dark:bg-gray-800 bg-white shadow-md`}>
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
      
      <div className="space-y-6">
        {/* Full Name Field */}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-1 transition-colors ${
            errors.personalInfo?.fullName 
              ? 'border-red-500' 
              :  'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-sm text-purple-700 bg-white dark:bg-gray-800 z-10">
              Full Name
            </label>
            <input
              {...register("personalInfo.fullName")}
              className={`w-full px-2 py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="John Doe"
            />
          </div>
          {errors.personalInfo?.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.personalInfo.fullName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-1 transition-colors ${
            errors.personalInfo?.email 
              ? 'border-red-500' 
              : 'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
 <label className="absolute -top-3 left-3 px-1 text-sm text-purple-700 bg-white dark:bg-gray-800 z-10">
  Email
</label>
            <input
              type="email"
              {...register("personalInfo.email")}
              className={`w-full px-2 py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="john@gmail.com"
            />
          </div>
          {errors.personalInfo?.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-1 transition-colors ${
            errors.personalInfo?.phone 
              ? 'border-red-500' 
              : 'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-sm text-purple-700 bg-white dark:bg-gray-800 z-10">
              Phone Number
            </label>
            <input
              {...register("personalInfo.phone")}
              className={`w-full px-2 py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          {errors.personalInfo?.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.personalInfo.phone.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;