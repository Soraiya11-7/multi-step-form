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
import { FaUser } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import WelcomeModal from "./components/WelcomeModal";
import InfoBanner from "./components/InfoBanner";
import Navbar from "./components/Navbar";

type FormData = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);


  const icons = [
    FaUser,
    HiOutlineLocationMarker,
    MdLockOutline,
    AiOutlineCheckCircle,
  ];

  const labels = ["Personal", "Address", "Account", "Review"];

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
    <div className={`min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white`}>
       {showWelcomeModal && (
        <WelcomeModal
          onClose={() => setShowWelcomeModal(false)} 
        />
      )}
      <div className="container mx-auto px-4 py-8">
      <Navbar  />

        {showSuccess ? (
          <div className={`max-w-md mx-auto p-6 rounded-lg dark:bg-gray-800 bg-white shadow-md text-center`}>
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
            <p className="mb-4">Thank you for completing the form.</p>
            <button
              onClick={startNewForm}
              className={`px-4 py-2 rounded-md dark:bg-purple-600 dark:hover:bg-purple-700 bg-purple-500 hover:bg-purple-600 text-white`}
            >
              Start New Form
            </button>
          </div>
        ) : (
          <>
           <InfoBanner/>

            <div className="max-w-md mx-auto">
              <div className="flex justify-between mb-8 relative">
                <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200 dark:bg-gray-700 z-0"></div>
                <div
                  className="absolute left-0 top-5 h-1 bg-purple-500 z-0"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                ></div>

                {[0, 1, 2, 3].map((index) => {
                  const Icon = icons[index];
                  return (
                    <div key={`step-${index}`} className="flex flex-col items-center z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${step === index + 1
                          ? "bg-purple-600 text-white"
                          : step > index + 1
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                          }`}
                      >
                        <Icon className="text-xl" />
                      </div>
                      <span className="text-sm my-2">{labels[index]}</span>
                    </div>
                  );
                })}
              </div>



              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {step === 1 && <PersonalInfoStep register={register} errors={errors}  />}
                {step === 2 && <AddressStep register={register} errors={errors}  />}
                {step === 3 && <AccountStep register={register} errors={errors}  />}
                {step === 4 && <ReviewStep watch={watch}  />}

                <div className="flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`px-4 py-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600
                          bg-gray-300 hover:bg-gray-400
                        `}
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className={`px-4 py-2 rounded-md text-white ${
                        isStepValid()
                          ? "bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
                          : "bg-purple-300 cursor-not-allowed dark:bg-purple-400"
                      }`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className={`px-4 py-2 rounded-md dark:bg-green-600 dark:hover:bg-green-700 bg-green-500 hover:bg-green-600
                       text-white`}
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
