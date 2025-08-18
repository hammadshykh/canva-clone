import React from "react";
import { shapesSettingsList } from "../Options";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";
import { Trash } from "lucide-react";
import { useCanvas } from "@/context/CanvasEditorContext";
import { toast } from "sonner";

const ShapesSettings = () => {
 const { canvasEditor } = useCanvas();

 const activeObject = canvasEditor?.getActiveObject();

 const handleDeleteObject = () => {
  if (!canvasEditor) {
   toast.error("Canvas not initialized");
   return;
  }

  const activeObject = canvasEditor.getActiveObject();
  if (!activeObject) {
   toast.warning("No object selected");
   return;
  }

  canvasEditor.remove(activeObject);
  canvasEditor.renderAll();
  toast.success("Object deleted");
 };

 return (
  <div className="flex items-center gap-6">
   {shapesSettingsList.map((shape, index) => (
    <div key={index} className="hover:scale-105 transition-all cursor-pointer">
     <Popover>
      <PopoverTrigger asChild>
       <shape.icon className="w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent className="p-2">{shape?.component}</PopoverContent>
     </Popover>
    </div>
   ))}
   <button
    onClick={handleDeleteObject}
    className="p-2  cursor-pointer hover:scale-105 transition-all"
    aria-label="Delete selected object"
   >
    <Trash className="w-5 h-5 transition-colors hover:text-red-600" />
   </button>
  </div>
 );
};

export default ShapesSettings;
