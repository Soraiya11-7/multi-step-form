import React from "react";
import { UseFormWatch } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>; 

interface ReviewStepProps {
  watch: UseFormWatch<FormData>;
  darkMode: boolean;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ watch, darkMode }) => {
  const formData = watch();

  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Personal Information</h3>
          <div className={`p-4 rounded ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <p><span className="font-medium">Full Name:</span> {formData.personalInfo.fullName}</p>
            <p><span className="font-medium">Email:</span> {formData.personalInfo.email}</p>
            <p><span className="font-medium">Phone:</span> {formData.personalInfo.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Address Details</h3>
          <div className={`p-4 rounded ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <p><span className="font-medium">Street:</span> {formData.address.street}</p>
            <p><span className="font-medium">City:</span> {formData.address.city}</p>
            <p><span className="font-medium">Zip Code:</span> {formData.address.zipCode}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Account Information</h3>
          <div className={`p-4 rounded ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <p><span className="font-medium">Username:</span> {formData.account.username}</p>
            <p><span className="font-medium">Password:</span> ********</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;