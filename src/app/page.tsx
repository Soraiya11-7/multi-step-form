"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "@/lib/schemas";
import PersonalInfoStep from "./components/steps/PersonalInfoStep";
import AddressStep from "./components/steps/AddressStep";
import AccountStep from "./components/steps/AccountStep";
import ReviewStep from "./components/steps/ReviewStep";
import { FaUser } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import WelcomeModal from "./components/modals/WelcomeModal";
import InfoBanner from "./components/modals/InfoBanner";


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
    <div className=" text-gray-900  dark:text-white">
      <div className="container w-[90%] mx-auto ">
        {showWelcomeModal && (
          <WelcomeModal
            onClose={() => setShowWelcomeModal(false)}
          />
        )}
        <div className="container mx-auto ">

          {/*   Success message...............*/}
          {showSuccess ? (
            <div className={`max-w-sm md:max-w-md mx-auto p-6 rounded-lg bg-white shadow-md mt-10 lg:mt-20 text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.05] hover:border-2 hover:border-white  dark:hover:border-purple-400`}>
              <div className="text-green-500  font-extrabold text-4xl md:text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold mb-2 text-black"><span className="hidden sm:inline-block">Submission</span> Successful!</h2>
              <p className="mb-4 text-black text-sm md:text-base">Thank you for completing the form.</p>
              <button
                onClick={startNewForm}
                className={`px-2 py-1 md:px-4 md:py-2 rounded-md bg-purple-500 text-white  hover:bg-purple-600 `}
              >
                Start New Form
              </button>
            </div>
          ) : (
            <>
            {/* short info........... */}
              <InfoBanner />

              <div className="max-w-md mx-auto mt-8">
                <div className="relative mb-8">
                  {/* Step container (positions bar relative to steps only)...................... */}
                  <div className="flex justify-between relative z-10">
                    {[0, 1, 2, 3].map((index) => {
                      const Icon = icons[index];
                      return (
                        <div key={`step-${index}`} className="flex flex-col items-center w-1/4">
                          <div
                            className={`w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center ${step === index + 1
                                ? "bg-purple-600 text-white"
                                : step > index + 1
                                  ? "bg-purple-500 text-white"
                                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                              }`}
                          >
                            <Icon className="text-lg md:text-xl" />
                          </div>
                          <span className="text-xs md:text-sm my-2">{labels[index]}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Base progress line (under the steps only)..................... */}
                  <div className="absolute top-3.5 md:top-5 left-[12.5%] right-[12.5%] h-1 bg-gray-200 dark:bg-gray-600 z-0"></div>

                  {/* Filled progress line........................ */}
                  <div
                    className="absolute top-3.5 md:top-5 left-[12.5%] h-1 bg-purple-500 z-0 transition-all duration-300"
                    style={{ width: `${((step - 1) / 3) * 75}%` }}
                  ></div>
                </div>

               {/* Main form.................................. */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6 mb-6">
                  {step === 1 && <PersonalInfoStep register={register} errors={errors} />}
                  {step === 2 && <AddressStep register={register} errors={errors} />}
                  {step === 3 && <AccountStep register={register} errors={errors} />}
                  {step === 4 && <ReviewStep watch={watch} />}

                  <div className="flex justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className={`px-2 py-1 md:px-4 md:py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white
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
                        className={`px-2 py-1 md:px-4 md:py-2 rounded-md text-white ${isStepValid()
                            ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
                            : "bg-gray-500  cursor-not-allowed dark:bg-purple-400"
                          }`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className={`px-2 py-1 md:px-4 md:py-2 rounded-md dark:bg-purple-600 dark:hover:bg-purple-700 bg-purple-600 hover:bg-purple-700
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
    </div>
  );
}
