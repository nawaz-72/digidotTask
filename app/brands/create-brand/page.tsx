"use client";
import Navbar from "@/app/components/navbar/Navbar";
import PrimaryInput from "@/app/components/primaryInput/PrimaryInput";
import TagInput from "@/app/components/tagInput/TagInput";
import Image from "next/image";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { BiPlus } from "react-icons/bi";
import { TbCloudUpload } from "react-icons/tb";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import ImageVideo from "@/app/components/createBrand/ImageVideo";
import BrandColorPicker from "@/app/components/createBrand/BrandColorPicker";

const documents = [
  { name: "Company Details.pdf", date: "02/03/2025" },
  { name: "Marketing Strategy.pdf", date: "04/03/2025" },
  { name: "Financial Report.pdf", date: "06/03/2025" },
];

export const brandValidationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  audience: Yup.string().required("Audience is required"),
  audienceType: Yup.string().required("Audience Type is required"),
  mission: Yup.string().required("Mission is required"),
  vision: Yup.string().required("Vision is required"),
  values: Yup.string().required("Values are required"),
  coreValues: Yup.string().required("Core Values are required"),

  logo: Yup.mixed()
    .required("Logo is required")
    .test("fileType", "Unsupported file format", (value: any) => {
      return value && ["image/jpeg", "image/png", "image/svg+xml"].includes(value.type);
    }),

  images: Yup.array()
    .of(
      Yup.mixed()
        .required("Image or video is required")
        .test("fileType", "Only image/video formats allowed", (file: any) => {
          return file && ["image/jpeg", "image/png", "video/mp4"].includes(file.type);
        })
    )
    .min(1, "At least one image or video is required"),

  documents: Yup.array()
    .of(
      Yup.mixed()
        .required("Document is required")
        .test("fileType", "Only PDFs are allowed", (file: any) => {
          return file && file.type === "application/pdf";
        })
    )
    .min(1, "At least one document is required"),
});

export interface BrandFormValues {
  description: string;
  audience: string;
  audienceType: string;
  mission: string;
  vision: string;
  values: string;
  coreValues: string;
  logo: File | null;
  images: File[];
  documents: File[];
}



const page = () => {
  const router = useRouter()

    // ✅ Formik Setup
    const formik = useFormik({
      initialValues: {
        description: "",
        audience: "",
        audienceType: "",
        mission: "",
        vision: "",
        values: "",
        coreValues: "",
      },
      validationSchema: brandValidationSchema,
      onSubmit: (values) => {
        console.log("Submitted values", values);
      },
    });
  
    const {
      handleChange,
      handleSubmit,
      values,
      errors,
      touched,
      handleBlur,
    } = formik;

  return (
    <div className="w-full min-h-screen flex">
      <div className=" w-[16%] min-w-[244px] bg-[#1F1F1F] flex justify-center ">
        <div className="w-[127px] h-[67px]">
          <Image
            src={"/images/logo3.png"}
            alt="logoImage"
            width={200}
            height={200}
            className="text-white bg-[#1F1F1F]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full bg-white ">
        <Navbar />
        <div className="px-6 py-5 w-full flex justify-between items-center bg-[#F0F8F8]">
          <div className="flex gap-2 xl:gap-4 justify-center items-center">
            <MdOutlineKeyboardBackspace className="text-black cursor-pointer" size={22} onClick={()=> router.back()} />
            <Image
              src={"/images/brand.png"}
              alt="brandImage"
              width={48}
              height={48}
            />
            <h1 className="text-xl xl:text-2xl font-medium text-black font-poppins">Brand Name</h1>
          </div>

          <div className="flex justify-center items-center gap-2 xl:gap-4 text-black">
            <div className="flex gap-2 justify-center items-center bg-[#B8B8C24A] p-2 rounded-[4px]">
              <FiUsers />
              <h1 className="font-normal text-xs xl:text-sm font-poppins">
                0 <span>Link Accounts</span>
              </h1>
            </div>

            <div className="bg-[#468C971F] p-2 xl:p-3 rounded-[4px]">
              <PiDotsThreeOutlineVerticalFill size={17} />
            </div>
          </div>
        </div>

        <form className="w-[100%] mt-2 bg-[#F0F8F8] grid grid-cols-2 text-black text-center py-8 px-6"  onSubmit={handleSubmit}>
          <div className="w-[97%] flex flex-col items-center gap-6 pb-6">
            <div className="w-full flex flex-col gap-4 items-start">
              <h1 className="text-lg xl:text-xl font-semibold font-dm-sans">Overview</h1>
              <PrimaryInput
                label="Description"
                name="description"
                placeholder="Dr Tarek Aesthetics is a premier cosmetic and aesthetic surgery clinic in Dubai"
                value={values.description}
                onChange={handleChange}
                color="black"
              />
              <div className="w-full flex justify-start items-center gap-2">
                <p className="text-[11px] font-dm-sans xl:text-xs font-medium min-w-[102px]">
                  Topical Cluster
                </p>
                <TagInput
                  borderColor="border-purple-500"
                  bgColor=""
                  textColor="text-purple-500"
                  maxTags={10}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 items-start">
              <h1 className="text-lg xl:text-xl font-dm-sans font-semibold">Core Details</h1>
              <PrimaryInput
                label="Audience"
                placeholder="Affluent individuals and professionals in Dubai seeking premium cosmetic and aesthetic procedures"
                value=""
                color="blue"
              />
              <PrimaryInput
                label="Audience Type"
                placeholder="Dr Tarek Aesthetics is a premier cosmetic and aesthetic surgery clinic in Dubai"
                value=""
                color="red"
              />
              <div className="w-full flex justify-start items-center gap-2">
                <p className="text-[11px] xl:text-xs font-dm-sans font-medium min-w-[102px]">
                  Audience Type
                </p>
                <TagInput
                  borderColor="border-[#F91E58]"
                  bgColor="bg-[#009FFD0F]"
                  textColor="text-[#F91E58]"
                  maxTags={10}
                />
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <p className="text-[11px] xl:text-xs font-medium font-dm-sans min-w-[102px]">
                  Tone of Voice
                </p>
                <TagInput
                  borderColor=""
                  bgColor="bg-[#F91E58]"
                  textColor="text-white"
                  maxTags={10}
                />
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <p className="text-[11px] xl:text-xs font-dm-sans font-medium min-w-[102px]">
                  Business Type
                </p>
                <TagInput
                  borderColor=""
                  bgColor="bg-[#2E2E2E]"
                  textColor="text-white"
                  maxTags={10}
                />
              </div>
              <div className="w-full flex justify-start items-center gap-2">
                <p className="text-[11px] xl:text-xs font-dm-sans font-medium min-w-[102px]">Industry</p>
                <TagInput
                  borderColor="border-[#ABABAB]"
                  bgColor="bg-white"
                  textColor="text-black"
                  maxTags={10}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 items-start">
              <h1 className="text-lg xl:text-xl font-dm-sans font-semibold">
                Mission, Vision and Values
              </h1>
              <PrimaryInput
                label="Mission"
                placeholder="Dr Tarek Aesthetics is a premier cosmetic and aesthetic surgery clinic in Dubai"
                value=""
                color="#5D5D5D"
              />
              <PrimaryInput
                label="Vision"
                placeholder="Dr Tarek Aesthetics is a premier cosmetic and aesthetic surgery clinic in Dubai"
                value=""
                color="#5D5D5D"
              />
              <PrimaryInput
                label="Values"
                placeholder="Dr Tarek Aesthetics is a premier cosmetic and aesthetic surgery clinic in Dubai"
                value=""
                color="#5D5D5D"
              />
              <PrimaryInput
                label="Core Values"
                placeholder="Dr Tarek Aesthetics is a premier cosmetic and aesthetic surgery clinic in Dubai"
                value=""
                color="#5D5D5D"
              />
            </div>
          </div>

          <div className="w-[97%] flex flex-col gap-6">
            {/* <div className="bg-white flex flex-col gap-4 py-4 px-6 rounded-lg">
              <div className=" flex w-full justify-between items-center ">
                <h1 className="text-lg xl:text-xl font-dm-sans font-semibold">Doucments</h1>
                <button className="py-0.5 px-1 flex items-center font-medium font-dem-Sans text-xs xl:text-sm bg-[#DDDDDD8C] rounded-sm">
                  <BiPlus size={22} color="#4D4D4D" /> Add New
                </button>
              </div>

              <div className="w-full xl:w-[75%] flex flex-col gap-[11px]">
                <div className="flex justify-between items-center pr-5">
                  <h2 className="text-[11px] xl:text-xs font-dm-sans text-[#787878]">Name</h2>
                  <h2 className="text-[11px] xl:text-xs font-dm-sans text-[#787878]">Uploaded Date</h2>
                </div>

                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center font-dm-sans"
                  >
                    <h2 className="text-[11px] xl:text-xs text-[#F91E58]">{doc.name}</h2>
                    <div className="flex justify-center items-center gap-3">
                      <h2 className="text-[11px] xl:text-xs text-black">{doc.date}</h2>
                      <div className="bg-[#468C971F] p-0.5 xl:p-1 rounded-[4px]">
                        <PiDotsThreeOutlineVerticalFill size={17} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <BrandColorPicker />

            <div className="bg-white flex flex-col gap-4 py-4 px-6 rounded-lg">
              <div className=" flex w-full justify-between items-center ">
                <h1 className="text-lg xl:text-xl font-dm-sans font-semibold">Logo</h1>
                <button className="py-0.5 px-1 flex items-center font-medium font-dm-sans text-xs xl:text-sm bg-[#DDDDDD8C] rounded-sm gap-2 cursor-pointer">
                  <TbCloudUpload size={22} color="#4D4D4D" /> Upload Logos
                </button>
              </div>

              <div className="w-[100px] h-[96px] xl:w-[112px] xl:min-h-[108px] bg-[#F3F3F3] rounded-sm flex justify-center items-center">
                <Image
                  src={"/images/brand2.png"}
                  alt="Logo"
                  width={500}
                  height={500}
                  className="bg-cover rounded-lg w-[75%] h-[75%]"
                />
              </div>
            </div>
                <ImageVideo/>
            {/* <div className="bg-white flex flex-col gap-4 py-4 px-6 rounded-lg">
              <div className=" flex w-full justify-between items-center ">
                <h1 className="text-lg xl:text-xl font-dm-sans font-semibold">Images & Videos</h1>
                <button className="py-0.5 px-2 flex items-center font-medium font-dem-Sans text-xs xl:text-sm bg-[#DDDDDD8C] rounded-sm gap-2 cursor-pointer">
                  <TbCloudUpload size={22} color="#4D4D4D" /> Upload
                </button>
              </div>

              <div className="w-[150px] min-h-[83px] xl:w-[176px] xl:min-h-[108px] bg-[#F3F3F3] rounded-sm flex justify-center items-center">
                <Image
                  src={"/images/brand2.png"}
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="bg-cover rounded-lg w-full h-full"
                />
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
