import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>;

interface AddressStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const AddressStep: React.FC<AddressStepProps> = ({ register, errors }) => {
  return (
     <div className={`p-4 md:p-6 rounded-lg dark:bg-gray-800 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] hover:border hover:border-purple-400`}>
      <h2 className="text-lg md:text-xl font-semibold mb-6">Address Details</h2>
      
      <div className="space-y-4 md:space-y-6">
        {/* Street Address Field ..................*/}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors ${
            errors.address?.street
              ? 'border-red-500 dark:border-red-400'
              :'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-purple-700 dark:text-white bg-white dark:bg-gray-800 z-10">
              Street Address
            </label>
            <input
              {...register("address.street")}
             className={`w-full px-1.5 py-0.5 text-xs md:text-sm md:px-2 md:py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="123 Main St"
            />
          </div>
          {errors.address?.street && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.street.message}
            </p>
          )}
        </div>

        {/* City Field ..............*/}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors ${
            errors.address?.city
              ? 'border-red-500 dark:border-red-400'
              :'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-purple-700 dark:text-white bg-white dark:bg-gray-800 z-10">
              City
            </label>
            <input
              {...register("address.city")}
             className={`w-full px-1.5 py-0.5 text-xs md:text-sm md:px-2 md:py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="New York"
            />
          </div>
          {errors.address?.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.city.message}
            </p>
          )}
        </div>

        {/* Zip Code Field ............*/}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-0.5 md:p-1 transition-colors ${
            errors.address?.zipCode
              ? 'border-red-500 dark:border-red-400'
              :'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-xs md:text-sm text-purple-700 dark:text-white bg-white dark:bg-gray-800 z-10">
              Zip Code
            </label>
            <input
              {...register("address.zipCode")}
             className={`w-full px-1.5 py-0.5 text-xs md:text-sm md:px-2 md:py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="10001"
            />
          </div>
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