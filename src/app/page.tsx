"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";
import PersonalInfoStep from "./components/PersonalInfoStep";
import AddressStep from "./components/AddressStep";
import AccountStep from "./components/AccountStep";
import ReviewStep from "./components/ReviewStep";

type FormData = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
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
    setShowSuccess(true);
    reset();
  };

  const nextStep = async () => {
    if (step >= 4) return;

    let isValid = false;

    if (step === 1) isValid = await trigger("personalInfo");
    else if (step === 2) isValid = await trigger("address");
    else if (step === 3) isValid = await trigger("account");

    if (isValid) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    if (step === 1) {
      return (
        !errors.personalInfo?.fullName &&
        !errors.personalInfo?.email &&
        !errors.personalInfo?.phone
      );
    } else if (step === 2) {
      return (
        !errors.address?.street &&
        !errors.address?.city &&
        !errors.address?.zipCode
      );
    } else if (step === 3) {
      return (
        !errors.account?.username &&
        !errors.account?.password &&
        !errors.account?.confirmPassword
      );
    }
    return true;
  };

  const startNewForm = () => {
    setShowSuccess(false);
    setStep(1);
    reset();
  };

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

        {showSuccess ? (
          <div className={`max-w-md mx-auto p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md text-center`}>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
            <p className="mb-4">Thank you for completing the form.</p>
            <button
              onClick={startNewForm}
              className={`px-4 py-2 rounded-md ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            >
              Start New Form
            </button>
          </div>
        ) : (
          <>
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
                    <span className="text-sm my-2">
                      {stepNumber === 1 && "Personal"}
                      {stepNumber === 2 && "Address"}
                      {stepNumber === 3 && "Account"}
                      {stepNumber === 4 && "Review"}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {step === 1 && <PersonalInfoStep register={register} errors={errors} darkMode={darkMode} />}
                {step === 2 && <AddressStep register={register} errors={errors} darkMode={darkMode} />}
                {step === 3 && <AccountStep register={register} errors={errors} darkMode={darkMode} />}
                {step === 4 && <ReviewStep watch={watch} darkMode={darkMode} />}

                <div className="flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`px-4 py-2 rounded-md ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    >
                      Previous
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className={`px-4 py-2 rounded-md ${
                        darkMode
                          ? isStepValid()
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-400 cursor-not-allowed"
                          : isStepValid()
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-blue-300 cursor-not-allowed"
                      } text-white`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
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
          </>
        )}
      </div>
    </div>
  );
}
