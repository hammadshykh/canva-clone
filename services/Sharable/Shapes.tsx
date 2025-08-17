import React from "react";
import { shapeList } from "../Options";
import Image from "next/image";
import { Circle, Line, Rect } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";

const Shapes = () => {
 const { canvasEditor } = useCanvas();
 const onShapeSelect = (shap: any) => {
  const properties = {
   left: 100,
   top: 100,
   radius: 50,
   fill: "black",
   width: 100,
   height: 100,
   stroke: "black",
   strikeWidth: 0,
  };
  if (shap.name == "Circle") {
   const circleRef = new Circle({ ...properties });
   canvasEditor?.add(circleRef);
  } else if (shap.name == "Square") {
   const squareRef = new Rect({ ...properties });
   canvasEditor?.add(squareRef);
  } else if (shap.name == "Line") {
   const LineRef = new Line([50, 50, 200, 200], {
    stroke: "black",
    strokeWidth: 5,
   });
   canvasEditor?.add(LineRef);
  }
  canvasEditor?.renderAll();
 };
 return (
  <div className="grid grid-cols-3 gap-3">
   {shapeList.map((shape, index) => (
    <div
     key={index}
     className="p-2 rounded-xl cursor-pointer hover:opacity-70"
     onClick={() => onShapeSelect(shape)}
    >
     <Image src={shape.icon} alt={shape.name} width={100} height={100} />
    </div>
   ))}
  </div>
 );
};

export default Shapes;
