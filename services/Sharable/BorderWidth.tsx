import { Slider } from "@/components/ui/slider";
import { useCanvas } from "@/context/CanvasEditorContext";
import React from "react";

const BorderWidth = () => {
 const { canvasEditor } = useCanvas();
 const handleWidthChange = (value: any) => {
  const activeObject = canvasEditor?.getActiveObject();
  if (activeObject) {
   activeObject?.set({
    strokeWidth: value,
   });
   //  canvasEditor?.add(activeObject as any);
   canvasEditor?.renderAll();
  }
 };

 return (
  <div className="space-y-2 p-2">
   <h2 className="text-sm font-medium">Border Width</h2>
   <Slider
    defaultValue={[5]}
    onValueChange={(v: number[]) => handleWidthChange(v[0])}
    max={20}
    min={1}
    step={1}
   />
  </div>
 );
};

export default BorderWidth;
