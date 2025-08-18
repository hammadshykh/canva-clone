import React, { useState } from "react";
import ColorPickerEditor from "./ColorPickerEditor";
import { useCanvas } from "@/context/CanvasEditorContext";

const BorderColor = () => {
 const [selectedColor, setSelectedColor] = useState("#000000"); // Default black color
 const { canvasEditor } = useCanvas();

 const handleColorChange = (newColor: string) => {
  setSelectedColor(newColor);
  // You can add additional logic here like updating canvas fill color

  const activeObject = canvasEditor?.getActiveObject();
  activeObject?.set({
   stroke: selectedColor,
  });

  canvasEditor?.add(activeObject as any);
  canvasEditor?.renderAll();

  console.log("Selected color:", newColor);
 };

 return (
  <div className="p-2">
   <ColorPickerEditor onColorChange={handleColorChange} value={selectedColor} />
   {/* Optional: Display current color */}
  </div>
 );
};

export default BorderColor;
