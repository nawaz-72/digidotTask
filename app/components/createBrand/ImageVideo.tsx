import Image from "next/image";
import { useState } from "react"; // Ensure React state is available
import { TbCloudUpload } from "react-icons/tb";

const ImageVideo = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedImages, setSelectedImages] = useState([false, false]); // Track selected state of individual images

  // Handle change for individual checkboxes
  const handleCheckboxChange = (index: any) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages[index] = !newSelectedImages[index];
    setSelectedImages(newSelectedImages);
  };

  // Handle select/deselect all
  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedImages(new Array(2).fill(newSelectAll)); // Assuming there are 2 images. Adjust accordingly.
  };

  return (
    <div className="bg-white flex flex-col gap-4 py-4 px-6 rounded-lg">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-lg xl:text-xl font-dm-sans font-semibold">Images & Videos</h1>
        <button className="py-0.5 px-2 flex items-center font-medium font-dem-Sans text-xs xl:text-sm bg-[#DDDDDD8C] rounded-sm gap-2 cursor-pointer">
          <TbCloudUpload size={22} color="#4D4D4D" /> Upload
        </button>
      </div>

      {/* Select All Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllChange}
          className="cursor-pointer"
        />
        <span className="text-sm">Select All</span>
      </div>

      {/* Image Containers with checkboxes */}
      <div className="flex gap-4">
        {['/images/brand2.png', '/images/brand3.png'].map((src, index) => (
          <div key={index} className="relative w-[150px] min-h-[83px] xl:w-[176px] xl:min-h-[108px] bg-[#F3F3F3] rounded-sm flex justify-center items-center">
            <input
              type="checkbox"
              checked={selectedImages[index]}
              onChange={() => handleCheckboxChange(index)}
              className="absolute top-2 left-2 z-10 cursor-pointer"
            />
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={1000}
              height={1000}
              className="bg-cover rounded-lg w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageVideo;
