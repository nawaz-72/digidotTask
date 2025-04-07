"use client";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { BsFileEarmarkPlus } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";
import { useRouter } from "next/navigation";
import PrimaryInput from "../components/primaryInput/PrimaryInput";
import { IoClose } from "react-icons/io5";
import NewBrand from "../components/NewBrand";

const page = () => {
  const [isCreate, setCreate] = useState(false);
  const router = useRouter();
  const [url, setUrl] = useState("");


  // Check if URL is valid (simple regex)
  const isValidUrl = (str: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "(([\\da-z.-]+)\\.([a-z.]{2,6})|" + // domain name and extension
        "(([0-9]{1,3}\\.){3}[0-9]{1,3}))" + // OR ip (v4) address
        "(\\:[0-9]{1,5})?" + // port
        "(\\/[-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?$", // path
      "i"
    );
    return !!pattern.test(str);
  };

  const onCreateBrand = () => {
    setCreate(true);
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-[16%] min-w-[244px] bg-[#1F1F1F] flex justify-center ">
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
        <div className="flex flex-col items-center mt-[55px] ">
          <div className="flex flex-col  items-center gap-2 max-w-[717px]">
            <h1 className="text-2xl font-medium text-black ">
              Establish your brand identity to drive your content strategy
            </h1>

            <p className="text-sm text-center max-w-[600px] text-[#4D4D4D]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-3 text-black">
            {/* Create new Brand  */}
            {/* <OutsideClickHandler onOutsideClick={() => setCreate(false)}> */}
            <div
              className={`flex flex-col justify-center items-center gap-6 min-w-[220px] xl:min-w-[280px] 2xl:min-w-[300px] h-[172px] rounded-[8px] bg-[#9E00000F]
            border  hover:border-[#9E0000E5] ${
              isCreate ? "border-[#9E0000E5]" : "border-transparent"
            }  cursor-pointer transition-all duration-200`}
              onClick={onCreateBrand}
            >
              <div className="flex justify-center items-center w-10 h-10 bg-[#9E000026] rounded-full">
                <BsFileEarmarkPlus size={22} color="#9E0000E5" />
              </div>
              <div className="text-center flex flex-col gap-1">
                <h1 className="text-sm xl:text-base font-medium font-">
                  Create New Brand From URL
                </h1>
                <p className="text-xs">We will scan a site</p>
              </div>
            </div>
            {/* </OutsideClickHandler> */}

            {/*My Brand  */}
            <div
              className="flex flex-col justify-center items-center gap-6 min-w-[220px] xl:min-w-[280px] 2xl:min-w-[300px] h-[172px] rounded-[8px] bg-[#000FDA0D]
            border border-transparent hover:border-[#000FDAE5] cursor-pointer transition-all duration-200"
            >
              <div className="flex justify-center items-center w-10 h-10 bg-[#000FDA26] rounded-full">
                <BsFileEarmarkPlus size={22} color="#000FDAE5" />
              </div>
              <div className="text-center flex flex-col gap-1">
                <h1 className="text-sm xl:text-base font-medium font-">
                  My Brand
                </h1>
                <p className="text-xs">View and manage your brand</p>
              </div>
            </div>
            {/* Confirm New Brand From Text */}
           <NewBrand/>
          </div>
        </div>

        {isCreate && (
          <OutsideClickHandler onOutsideClick={() => setCreate(false)}>
            <div className="flex flex-col gap-2 text-black text-start min-w-[700px] xl:min-w-[860px] mt-[44px] transition-all duration-200 z-50">
              <h1 className="text-base font-medium ">Enter your website *</h1>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://abc.com"
                className="border border-[#D9D9D9] px-4 py-2 rounded-[8px]"
              />

              <div className="mt-2 w-full flex justify-end gap-4 text-base">
                <button
                  className="border border-[#919191] rounded-[8px] py-2 px-6 text-[#919191] cursor-pointer"
                  onClick={() => setCreate(false)}
                >
                  Cancel
                </button>
                <button
                  className={`rounded-[8px] py-2 px-6 text-white cursor-pointer ${
                    isValidUrl(url)
                      ? "bg-black"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() => router.push("brands/create-brand")}
                  disabled={!isValidUrl(url)}
                >
                  Continue
                </button>
              </div>
            </div>
          </OutsideClickHandler>
        )}
      </div>
    </div>
  );
};

export default page;
