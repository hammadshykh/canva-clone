import React from "react";
import { shapeList } from "../Options";
import Image from "next/image";
import { Circle, Line, Rect, Triangle } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";

const Shapes = () => {
 const { canvasEditor } = useCanvas();

 const onShapeSelect = (shape: any) => {
  const commonProperties = {
   left: 100,
   top: 100,
   fill: "black",
   stroke: "black",
   strokeWidth: 0,
  };

  let shapeObject: any;

  switch (shape.name) {
   case "Circle":
    shapeObject = new Circle({
     ...commonProperties,
     radius: 50,
    });
    break;

   case "Square":
    shapeObject = new Rect({
     ...commonProperties,
     width: 100,
     height: 100,
    });
    break;

   case "Triangle":
   case "Trangle": // Handle both spellings
    shapeObject = new Triangle({
     ...commonProperties,
     width: 120,
     height: 100,
    });
    break;

   case "Line":
    shapeObject = new Line([50, 50, 200, 200], {
     stroke: "black",
     strokeWidth: 5,
     left: 100,
     top: 100,
    });
    break;

   default:
    console.warn("Unknown shape:", shape.name);
    return;
  }

  if (shapeObject && canvasEditor) {
   canvasEditor.add(shapeObject);
   canvasEditor.renderAll();

   // Optional: Center the shape on canvas
   setTimeout(() => {
    shapeObject.center(); // Fixed typo: comter -> center
    canvasEditor.renderAll();
   }, 100);
  }
 };

 return (
  <div className="grid grid-cols-3 gap-3 p-2">
   {shapeList.map((shape, index) => (
    <div
     key={index}
     className="p-3 rounded-xl cursor-pointer hover:bg-secondary transition-colors flex flex-col items-center"
     onClick={() => onShapeSelect(shape)}
     title={`Add ${shape.name}`}
    >
     <Image
      src={shape.icon}
      alt={shape.name}
      width={40}
      height={40}
      className="mb-2"
     />
     <span className="text-xs text-center">{shape.name}</span>
    </div>
   ))}
  </div>
 );
};

export default Shapes;
