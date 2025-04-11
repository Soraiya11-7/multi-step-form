import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>;

interface AccountStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const AccountStep: React.FC<AccountStepProps> = ({ register, errors }) => {
  return (
    <div className={`p-6 rounded-lg dark:bg-gray-800 bg-white shadow-md`}>
      <h2 className="text-xl font-semibold mb-6">Account Setup</h2>
      
      <div className="space-y-6">
        {/* Username Field ..............*/}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-1 transition-colors ${
            errors.account?.username
              ? 'border-red-500'
              :'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-sm text-purple-700 bg-white dark:bg-gray-800 z-10">
              Username
            </label>
            <input
              {...register("account.username")}
             className={`w-full px-2 py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="johndoe123"
            />
          </div>
          {errors.account?.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.account.username.message}
            </p>
          )}
        </div>

        {/* Password Field............. */}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-1 transition-colors ${
            errors.account?.password
              ? 'border-red-500'
              :'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-sm text-purple-700 bg-white dark:bg-gray-800 z-10">
              Password
            </label>
            <input
              type="password"
              {...register("account.password")}
             className={`w-full px-2 py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="••••••••"
            />
          </div>
          {errors.account?.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.account.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field......... */}
        <div className="relative">
          <div className={`relative border-2 rounded-lg p-1 transition-colors ${
            errors.account?.confirmPassword
              ? 'border-red-500'
              :'border-gray-300 focus-within:border-purple-500 dark:border-gray-600 dark:focus-within:border-purple-500'
          }`}>
            <label className="absolute -top-3 left-3 px-1 text-sm text-purple-700 bg-white dark:bg-gray-800 z-10">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("account.confirmPassword")}
             className={`w-full px-2 py-1 bg-transparent focus:outline-none dark:text-white  text-gray-800`}
              placeholder="••••••••"
            />
          </div>
          {errors.account?.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.account.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountStep;