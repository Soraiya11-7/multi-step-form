import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>;

interface AddressStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  darkMode: boolean;
}

const AddressStep: React.FC<AddressStepProps> = ({register, errors, darkMode}) => {
  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <h2 className="text-xl font-semibold mb-4">Address Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Street Address</label>
          <input
            {...register("address.street")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.address?.street ? "border-red-500" : ""}`}
          />
          {errors.address?.street && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.street.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">City</label>
          <input
            {...register("address.city")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.address?.city ? "border-red-500" : ""}`}
          />
          {errors.address?.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.city.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Zip Code</label>
          <input
            {...register("address.zipCode")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.address?.zipCode ? "border-red-500" : ""}`}
          />
          {errors.address?.zipCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.zipCode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressStep;