"use client";
import React, { useState } from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerTask,
  DrawerTrigger,
} from "../components/ui/DrawerTask";
import { useRouter } from "next/navigation";
import PrimaryInput from "../components/primaryInput/PrimaryInput";
import { IoClose } from "react-icons/io5";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { RxDownload } from "react-icons/rx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const stepsArray = [
  {
    step: 1,
    title: "Basic Identity ",
    inputs: [
      {
        type: "input",
        label: "Brand Name",
        placeholder: "Enter brand name",
        required: false,
      },
      {
        type: "textarea",
        label: "Brand Description",
        placeholder: "Add brand description",
        required: false,
      },
    ],
    uploads: [
      {
        type: "file",
        label: "UAdd Company Documents",
        accept: ".pdf",
        required: true,
      },
      { type: "image", label: "Add Logo", accept: "image/*", required: true },
    ],
  },
  {
    step: 2,
    title: "Passions, Joy & Fulfillment",
    inputs: [
      {
        type: "textarea",
        label: "What are you most passionate about?",
        placeholder: "define your target audience",
        required: true,
      },
      {
        type: "textarea",
        label: "What are your hobbies?",
        placeholder: "Your response",
        required: true,
      },
      {
        type: "textarea",
        label: "What brings you the most joy in life?",
        placeholder: "Your response",
        required: true,
      },
      {
        type: "textarea",
        label: "What role in life makes you feel most fulfilled?",
        placeholder: "Your response",
        required: true,
      },
      {
        type: "textarea",
        label: "What are your top 3 core values?",
        placeholder: "Your response",
        required: true,
      },
    ],
  },
  {
    step: 3,
    title: " Emotional Depth & Turning Points",
    inputs: [
      {
        type: "textarea",
        label:
          "Describe your lowest moment — how did it feel, what were you going through, and how old were you?",
        placeholder: "write core message",
        required: true,
      },
      {
        type: "textarea",
        label:
          "Describe your happiest moment — how did it feel, and what helped you reach it?",
        placeholder: "Your response",
        required: true,
      },
      {
        type: "textarea",
        label:
          "How can you help others move from their lowest to their happiest?",
        placeholder: "Your response",
        required: true,
      },
    ],
  },
  {
    step: 4,
    title: " Origin Story & Purpose",
    inputs: [
      {
        type: "input",
        label: "What inspired you to start this brand?",
        placeholder: "enter text",
        required: false,
      },
      {
        type: "input",
        label:
          "Was there a specific moment when you knew this is what you wanted to do?",
        placeholder: "Your response",
        required: false,
      },
      {
        type: "input",
        label: "What makes your story different from others in your industry?",
        placeholder: "Your response",
        required: false,
      },
    ],
  },
  {
    step: 5,
    title: " Journey & Transformation",
    inputs: [
      {
        type: "textarea",
        label: "What were some key struggles on your journey so far?",
        placeholder: "enter text",
        required: false,
      },
      {
        type: "textarea",
        label: "How have you changed or grown since you started this journey?",
        placeholder: "Your response",
        required: false,
      },
      {
        type: "textarea",
        label: "What’s the biggest lesson you've learned through this process?",
        placeholder: "Your response",
        required: false,
      },
    ],
  },
  {
    step: 6,
    title: " Mission, Vision & Impact *",
    inputs: [
      {
        type: "textarea",
        label: "What is the mission of your brand?",
        placeholder: "enter text",
        required: true,
      },
      {
        type: "textarea",
        label: "What is the bigger vision you're working toward?",
        required: false,
        placeholder: "Your response",
      },
      {
        type: "textarea",
        label:
          "What kind of change do you want your brand to bring in people’s lives?",
        placeholder: "Your response",
        required: false,
      },
      {
        type: "textarea",
        label: "What legacy do you want to leave behind through this brand?",
        placeholder: "Your response",
        required: false,
      },
    ],
  },
  {
    step: 7,
    title: " Industry *",
    inputs: [
      {
        type: "input",
        label: "What is your main Industry?",
        placeholder: "write industry",
        required: true,
      },
      {
        type: "input",
        label: "What is your main Sub-Industry?",
        placeholder: "write industry",
        required: true,
      },
    ],
  },
  {
    step: 8,
    title: " Product/Service Clarity *",
    inputs: [
      {
        type: "input",
        label: "Is your offering a product or a service?",
        placeholder: "write industry",
        required: true,
      },
      {
        type: "input",
        label: "Is your brand targeting businesses or consumers?",
        placeholder: "write industry",
        required: false,
      },
    ],
  },
  {
    step: 9,
    title: " Voice & Personality *",
    inputs: [
      {
        type: "input",
        label: "If your brand was a person, how would you describe it?",
        placeholder: "e.g., bold, nurturing, visionary, elegant, witty",
        required: false,
      },
      {
        type: "input",
        label: "What kind of language and tone should your brand speak in?",
        placeholder: "e.g., bold, nurturing, visionary, elegant, witty",
        required: false,
      },
    ],
  },
  // ...more steps
];

const generateInitialValues = () => {
  const values: { [key: string]: string } = {};
  stepsArray.forEach((step) => {
    step.inputs?.forEach((field) => {
      values[field.label] = "";
    });
    step.uploads?.forEach((upload) => {
      values[upload.label] = ""; // for file/image
    });
  });
  return values;
};

const generateValidationSchema = (stepIndex: number) => {
  const step = stepsArray[stepIndex];
  const shape: any = {};

  step.inputs?.forEach((field) => {
    if (field.required) {
      shape[field.label] = Yup.string().required("This field is required");
    } else {
      shape[field.label] = Yup.string();
    }
  });

  step.uploads?.forEach((upload) => {
    if (upload.required) {
      shape[upload.label] = Yup.mixed().required("This is required");
    } else {
      shape[upload.label] = Yup.mixed();
    }
  });

  return Yup.object().shape(shape);
};

const NewBrand = () => {
  const [step, setStep] = useState(0);

  const currentStep = stepsArray[step];

  const nextStep = () => {
    if (step <= stepsArray.length - 1) {
      setStep((prevStep) => Math.min(prevStep + 1, stepsArray.length - 1));
    }
  };

  const prevStep = () => {
    
    if (step >= 1) setStep(step - 1);
  };
  return (
    <DrawerTask onClose={() => setStep(0)}>
      <DrawerTrigger>
        <div
          className="flex flex-col justify-center items-center gap-6 min-w-[220px] xl:min-w-[280px] 2xl:min-w-[300px] h-[172px] rounded-[8px] bg-[#009E810F]
  border border-transparent hover:border-[#009E81] cursor-pointer transition-all duration-200"
        >
          <div className="flex justify-center items-center w-10 h-10 bg-[#009E810F] rounded-full">
            <BsFileEarmarkPlus size={22} color="#009E81" />
          </div>
          <div className="text-center flex flex-col gap-1">
            <h1 className="text-sm xl:text-base font-medium font-poppins">
              Create New Brand from Text
            </h1>
            <p className="text-xs font-poppins">Write or copy and paste text</p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-w-[700px] mx-auto">
        <Formik
          initialValues={generateInitialValues()}
          validationSchema={generateValidationSchema(step)}
          onSubmit={(values) => {
            console.log("Final Form Values =>", values);
            // send `values` to backend here
          }}
        >
          {({
            setFieldValue,
            setFieldTouched,
            errors,
            touched,
            setTouched,
            handleSubmit,
            validateForm,
            values,
          }) => (
            <Form className="flex flex-col h-[95vh] ">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-xl xl:text-2xl font-medium font-poppins">
                  Create New Brand from Text
                </h2>
                <DrawerClose>
                  <IoClose size={22} className="cursor-pointer" />
                </DrawerClose>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto ">
                <div className="p-6 bg-[#F0F9FF]">
                  <h1 className="text-lg xl:text-xl font-semibold font-poppins">
                    {currentStep.title}
                  </h1>

                  {/* Progressbar */}
                  <div className="flex items-center justify-center mb-6 mt-4 relative">
                    <div className="h-[1px] w-8 mx-2 bg-pink-400" />
                    {stepsArray.map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center"
                      >
                        {index !== 0 && (
                          <div className="h-[1px] w-8 mx-2 bg-pink-400" />
                        )}
                        <div
                          className={`w-5 h-5 flex items-center justify-center rounded-full border-1 text-xs font-medium ${
                            step > index
                              ? "bg-pink-400 border-pink-400 text-white"
                              : "bg-white text-pink-400 border-pink-400"
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Inputs */}
                  {currentStep?.inputs?.map((input: any, index: any) => (
                    <div key={index} className="flex flex-col gap-2 mb-4">
                      <label className="font-medium text-sm font-poppins">
                        {input.label} {input.required && "*"}
                      </label>
                      {input.type === "input" ? (
                        <input
                          className="bg-white rounded-lg px-4 py-2 w-full text-sm font-dm-sans"
                          placeholder={input.placeholder}
                          required={input.required}
                          name={input.label}
                          onChange={(e) =>
                            setFieldValue(input.label, e.target.value)
                          }
                          value={values[input.label]}
                          onBlur={() => setFieldTouched(input.label, true)}
                        />
                      ) : (
                        <textarea
                          className="bg-white rounded-lg px-4 py-2 w-full text-sm font-dm-sans resize-none"
                          placeholder={input.placeholder}
                          required={input.required}
                          onChange={(e) =>
                            setFieldValue(input.label, e.target.value)
                          }
                          value={values[input.label]}
                          onBlur={() => setFieldTouched(input.label, true)}
                        />
                      )}
                      <ErrorMessage
                        name={input.label}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}

                  {currentStep.uploads?.map((upload: any, index: any) => (
                    <div key={index} className="flex flex-col gap-2 mb-4">
                      <label className="font-medium text-sm">
                        {upload.label} {upload.required && "*"}
                      </label>

                      {upload.type === "file" ? (
                        <div>
                          <input
                            name={upload.label}
                            id={`fileInput-${index}`}
                            type="file"
                            accept={upload.accept}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              setFieldValue(upload.label, file);
                            }}
                          />
                          <label
                            className="w-[44px] h-[44px] bg-white rounded-full flex justify-center items-center cursor-pointer"
                            htmlFor={`fileInput-${index}`}
                          >
                            <RxDownload size={22} className="rotate-180" />
                          </label>

                          {/* 👇 Show File Name if uploaded */}
                          {values[upload.label] && (
                            <p className="text-sm mt-1">
                              {(values[upload.label] as unknown as File).name}
                            </p>
                          )}

                          {touched[upload.label] && errors[upload.label] && (
                            <div className="text-red-500 text-sm">
                              {errors[upload.label]}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <input
                            name={upload.label}
                            id={`imgInput-${index}`}
                            type="file"
                            accept={upload.accept}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              setFieldValue(upload.label, file);

                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const imgPreview = document.getElementById(
                                    `img-preview-${index}`
                                  ) as HTMLImageElement;
                                  if (imgPreview)
                                    imgPreview.src = reader.result as string;
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <label
                            className="w-[44px] h-[44px] bg-white rounded-full flex justify-center items-center cursor-pointer"
                            htmlFor={`imgInput-${index}`}
                          >
                            <FiPlus size={22} className="rotate-180" />
                          </label>

                          {/* 👇 Show Image Preview */}
                          {values[upload.label] && (
                            <img
                              id={`img-preview-${index}`}
                              alt="preview"
                              className="mt-2 max-h-[100px] object-contain rounded"
                            />
                          )}

                          {touched[upload.label] && errors[upload.label] && (
                            <div className="text-red-500 text-sm">
                              {errors[upload.label]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="py-4 px-6 border-t">
                <div className={`w-full flex ${step > 0 ? "justify-between" : "justify-end"}`}>
                {step > 0 && (
  <button
    type="button"
    onClick={() => {
      const currentStepFields = [
        ...(currentStep.inputs?.map((i) => i.label) || []),
        ...(currentStep.uploads?.map((u) => u.label) || []),
      ];

      // Clear touched fields for current step
      const updatedTouched: { [key: string]: boolean } = {};
      currentStepFields.forEach((field) => {
        updatedTouched[field] = false;
      });

      // Reset touched using Formik's API
      setTouched(updatedTouched, false);

      // Go to previous step
      prevStep();
    }}
    className="bg-white text-[#919191] border border-[#919191] rounded-lg px-4 py-2 cursor-pointer"
  >
    Previous Step
  </button>
)}

                  {step < stepsArray.length - 1 ? (
                    <button
                      className="text-white px-6 py-2 bg-black rounded-lg cursor-pointer"
                      type="button"
                      onClick={async () => {
                        console.log("show the form", values);
                        const errors = await validateForm();
                        const currentStepFields = [
                          ...(currentStep.inputs?.map((i) => i.label) || []),
                          ...(currentStep.uploads?.map((u) => u.label) || []),
                        ];

                        const hasErrors = currentStepFields.some(
                          (field) => errors[field]
                        );

                        if (!hasErrors) {
                          nextStep();
                        } else {
                          // Mark all current step fields as touched
                          currentStepFields.forEach((field) =>
                            setFieldTouched(field, true)
                          );
                        }
                      }}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={() => handleSubmit()}
                      className="text-white px-6 py-2 bg-black rounded-lg cursor-pointer"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DrawerContent>
    </DrawerTask>
  );
};

export default NewBrand;
