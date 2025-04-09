"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";

type FormData = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const { 
    handleSubmit, 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
      },
      address: {
        street: "",
        city: "",
        zipCode: "",
      },
      account: {
        username: "",
        password: "",
        confirmPassword: "",
      },
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Multi-Step Form</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Welcome Message Section */}
        <div className={`mb-8 p-4 rounded-lg text-center ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
          <h2 className="text-xl font-semibold mb-2">Welcome to Our Form!</h2>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Please complete all steps to submit your information. 
            This should take less than 2 minutes.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === stepNumber
                      ? "bg-blue-600 text-white"
                      : step > stepNumber
                      ? "bg-green-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {stepNumber}
                </div>
                 <span className="text-sm my-2 ">
                  {stepNumber === 1 && "Personal"}
                  {stepNumber === 2 && "Address"}
                  {stepNumber === 3 && "Account"}
                  {stepNumber === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div>
                <h2 className="text-yellow-500 border border-green-500 p-2 text-center font-bold ">PersonalInfoStep</h2>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-yellow-500 border border-green-500 p-2 text-center font-bold">AddressStep</h2>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-yellow-500 border border-green-500 p-2 text-center font-bold">AccountStep</h2>
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-yellow-500 border border-green-500 p-2 text-center font-bold">Review</h2>
              </div>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-4 py-2 rounded-md ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-4 py-2 rounded-md ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}