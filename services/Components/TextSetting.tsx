import { useCanvas } from "@/context/CanvasEditorContext";
import { IText } from "fabric";
import React from "react";

const TextSetting = () => {
 const { canvasEditor } = useCanvas();
 const onAddTextClick = (type: any) => {
  if (canvasEditor) {
   if (type == "Heading") {
    const textRef = new IText("Add Heading", {
     fontSize: 30,
     fontWeight: "bold",
     fontFamily: "Arial",
     fill: "black",
     left: 100,
     top: 100,
    });
    canvasEditor.add(textRef);
   } else if (type == "Subheading") {
    const textRef = new IText("Add SubHeading", {
     fontSize: 20,
     fontWeight: "400",
     fontFamily: "Arial",
     fill: "black",
     left: 100,
     top: 100,
    });
    canvasEditor.add(textRef);
   } else {
    const textRef = new IText("Add Paragraph", {
     fontSize: 14,
     fontWeight: "normal",
     fontFamily: "Arial",
     fill: "black",
     left: 100,
     top: 100,
    });
    canvasEditor.add(textRef);
   }
  }
 };
 return (
  <div className="flex flex-col gap-5">
   <h2
    className="font-bold text-2xl p-3 bg-secondary rounded-xl cursor-pointer"
    onClick={() => onAddTextClick("Heading")}
   >
    Add Heading
   </h2>
   <h2
    className="font-bold text-xl p-3 bg-secondary rounded-xl cursor-pointer"
    onClick={() => onAddTextClick("Subheading")}
   >
    Add Subheading
   </h2>
   <h2
    className="font-bold text-base p-3 bg-secondary rounded-xl cursor-pointer"
    onClick={() => onAddTextClick("Para")}
   >
    Paragraph
   </h2>
  </div>
 );
};

export default TextSetting;
