import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const BrandColorPicker = () => {
  const [colors, setColors] = useState<string[]>([]); // Stores selected colors
  const [showColorPicker, setShowColorPicker] = useState(false); // Controls visibility of color picker
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default color

  // Handle add new color
  const handleAddNewColor = () => {
    setShowColorPicker(true); // Show color picker modal
  };

  // Handle color selection from color picker
  const handleColorChange = (color: any) => {
    console.log("which color:",color)
    setSelectedColor(color); // Update selected color
  };

  // Save selected color // Save selected color
  const handleSaveColor = () => {
    console.log('Selected color before saving:', selectedColor); // Log to check value
    
    if (selectedColor && !colors.includes(selectedColor)) {
      setColors((prevColors) => [...prevColors, selectedColor]); // Add color to the list
      setShowColorPicker(false); // Close color picker after saving
    }
  };

  console.log("colors:", colors); // Log colors array

  return (
    <div className="relative bg-white flex flex-col gap-4 py-4 px-6 rounded-lg">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-lg xl:text-xl font-dm-sans font-semibold">Brand Colors</h1>
        <button
          className="py-0.5 px-2 flex items-center font-medium font-dem-Sans text-xs xl:text-sm bg-[#DDDDDD8C] rounded-sm gap-2 cursor-pointer"
          onClick={handleAddNewColor}
        >
          Add New
        </button>
      </div>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <div className="absolute z-50 top-1/4 right-0 bg-white p-6 rounded-lg shadow-lg">
          <HexColorPicker
            color={selectedColor}
            onChange={handleColorChange} // On color change, update the selected color
          />
          <button
            onClick={handleSaveColor}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save Color
          </button>
        </div>
      )}

      {/* Display selected colors */}
      <div className="grid grid-cols-9 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="relative w-[70px] h-[70px] rounded-sm flex justify-center items-center">
            <div
              style={{ backgroundColor: color }}
              className={`rounded-full w-[70px] h-[70px] border-2 border-white `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandColorPicker;
