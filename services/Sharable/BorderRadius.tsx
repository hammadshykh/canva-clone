import { Slider } from "@/components/ui/slider";
import { useCanvas } from "@/context/CanvasEditorContext";
import React from "react";

const BorderRadius = () => {
 const { canvasEditor } = useCanvas();

 const handleRadiusChange = (value: number[]) => {
  const activeObject = canvasEditor?.getActiveObject();
  if (activeObject) {
   // For rectangles and other shape objects
   if ("rx" in activeObject && "ry" in activeObject) {
    activeObject.set({
     rx: value[0],
     ry: value[0],
    });
   }
   // For image objects (needs corner style set first)
   else if (activeObject.type === "image") {
    activeObject.set({
     cornerStyle: "round",
     cornerSize: value[0],
    });
   }
   canvasEditor?.renderAll();
  }
 };

 return (
  <div className="space-y-2 p-2">
   <h2 className="text-sm font-medium">Update Radius</h2>
   <Slider
    defaultValue={[0]} // Sharp corners by default
    onValueChange={(v) => handleRadiusChange(v)}
    max={50} // Maximum radius in pixels
    min={0}
    step={1}
   />
  </div>
 );
};

export default BorderRadius;
