import React, { useState } from "react";
import ColorPickerEditor from "./ColorPickerEditor";

const FillColor = () => {
 const [selectedColor, setSelectedColor] = useState("#000000"); // Default black color

 const handleColorChange = (newColor: string) => {
  setSelectedColor(newColor);
  // You can add additional logic here like updating canvas fill color
  console.log("Selected color:", newColor);
 };

 return (
  <div className="p-2">
   <ColorPickerEditor onColorChange={handleColorChange} value={selectedColor} />
   {/* Optional: Display current color */}
   <div className="mt-2 text-xs text-gray-500">
    Current color: {selectedColor}
   </div>
  </div>
 );
};

export default FillColor;
