import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>;

interface AccountStepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  darkMode: boolean;
}

const AccountStep: React.FC<AccountStepProps> = ({register, errors, darkMode}) => {
  return (
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
      <h2 className="text-xl font-semibold mb-4">Account Setup</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Username</label>
          <input
            {...register("account.username")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.account?.username ? "border-red-500" : ""}`}
          />
          {errors.account?.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.account.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("account.password")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.account?.password ? "border-red-500" : ""}`}
          />
          {errors.account?.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.account.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("account.confirmPassword")}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } ${errors.account?.confirmPassword ? "border-red-500" : ""}`}
          />
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