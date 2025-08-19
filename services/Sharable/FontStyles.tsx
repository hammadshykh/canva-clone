import { Toggle } from "@/components/ui/toggle";
import { useCanvas } from "@/context/CanvasEditorContext";
import { Bold, Italic, Underline } from "lucide-react";
import React from "react";

const FontStyles = () => {
 const { canvasEditor } = useCanvas();

 const activeObject: any = canvasEditor?.getActiveObject();
 const onSettingClick = (type: string) => {
  if (activeObject) {
   if (type == "bold") {
    activeObject.set({
     fontWeight: activeObject?.fontWeight == "bold" ? null : "bold",
    });
   }
   if (type == "italic") {
    activeObject.set({
     fontStyle: activeObject?.fontStyle == "italic" ? "normal" : "italic",
    });
   }
   if (type == "underline") {
    activeObject.set({
     underline: activeObject?.underline ? false : true,
    });
   }
   canvasEditor?.add(activeObject);
  }
 };

 return (
  <div>
   <Toggle
    className="text-black"
    aria-label="Toggle bold"
    defaultPressed={activeObject?.fontWeight == "bold"}
    onClick={() => onSettingClick("bold")}
   >
    <Bold className="w-4 h-4" size={"lg"} />
   </Toggle>
   <Toggle
    aria-label="Toggle italic"
    onClick={() => onSettingClick("italic")}
    defaultPressed={activeObject?.fontStyle == "italic"}
   >
    <Italic className="w-4 h-4" size={"lg"} />
   </Toggle>
   <Toggle
    aria-label="Toggle underline"
    onClick={() => onSettingClick("underline")}
    defaultPressed={activeObject?.underline}
   >
    <Underline className="w-4 h-4" />
   </Toggle>
  </div>
 );
};

export default FontStyles;
