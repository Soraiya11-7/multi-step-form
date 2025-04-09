import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>;

interface PersonalInfoStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  darkMode: boolean;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({register, errors, darkMode}) => {
  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            {...register("personalInfo.fullName")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.personalInfo?.fullName ? "border-red-500" : ""}`}
          />
          {errors.personalInfo?.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.personalInfo.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("personalInfo.email")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.personalInfo?.email ? "border-red-500" : ""}`}
          />
          {errors.personalInfo?.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            {...register("personalInfo.phone")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.personalInfo?.phone ? "border-red-500" : ""}`}
          />
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