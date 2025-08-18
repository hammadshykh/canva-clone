import React from "react";
import { FontFamilyList } from "../Options";
import { useCanvas } from "@/context/CanvasEditorContext";

const FontFamily = () => {
 const { canvasEditor } = useCanvas();

 const handleFontFamilyChange = (value: any) => {
  const activeObject = canvasEditor?.getActiveObject();
  if (activeObject) {
   activeObject.set({
    fontFamily: value,
   });
   //  canvasEditor?.add(activeObject);
   canvasEditor?.renderAll();
  }
 };

 return (
  <div className="h-[200px] space-y-2 overflow-auto">
   {FontFamilyList.map((font, index) => (
    <h2
     key={index}
     className="text-lg bg-secondary rounded-lg p-2 cursor-pointer"
     style={{ fontFamily: font }}
     onClick={() => handleFontFamilyChange(font)}
    >
     {font}
    </h2>
   ))}
  </div>
 );
};

export default FontFamily;
