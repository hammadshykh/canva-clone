import { Slider } from "@/components/ui/slider";
import { useCanvas } from "@/context/CanvasEditorContext";
import React from "react";

const OpacitySlider = () => {
 const { canvasEditor } = useCanvas();

 const handleOpacityChange = (value: number[]) => {
  const activeObject = canvasEditor?.getActiveObject();
  if (activeObject) {
   // Convert from 0-100 range to 0-1 for fabric.js
   const opacityValue = value[0] / 100;
   activeObject.set({
    opacity: opacityValue,
   });
   //  canvasEditor?.add(activeObject);
   canvasEditor?.renderAll();
  }
 };

 return (
  <div className="space-y-2 p-2">
   <h2 className="text-sm font-medium">Opacity</h2>
   <Slider
    defaultValue={[100]} // 100% opacity by default
    onValueChange={(v) => handleOpacityChange(v)}
    max={100}
    min={0}
    step={1}
   />
  </div>
 );
};

export default OpacitySlider;
