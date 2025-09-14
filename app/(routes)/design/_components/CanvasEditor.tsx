"use client";
import React, { useEffect, useRef } from "react";
import { Canvas, Rect } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";
import TopNavbar from "@/services/Components/TopNavbar";

type Props = { designInfo: any };

const CanvasEditor = ({ designInfo }: Props) => {
 // Use a single ref for the canvas element
 const canvasRef = useRef<HTMLCanvasElement | null>(null);

 const { activeSide, setActiveSide, setCanvas, canvas } = useCanvas();

 const safeRatio = 0.6; // A ref to store the canvas content for each side

 const designContentRef = useRef<Record<string, any>>({
  front: null,
  back: null,
 }); // 1. Initialize canvas and load initial design

 useEffect(() => {
  if (!designInfo || !canvasRef.current || canvas) return;

  const displayWidth = Math.round((designInfo?.width || 800) / 2);
  const displayHeight = Math.round((designInfo?.height || 600) / 2);

  const newCanvas = new Canvas(canvasRef.current, {
   width: displayWidth,
   height: displayHeight,
   backgroundColor: "transparent",
   preserveObjectStacking: true,
   selectionBorderColor: "#ccc",
  }); // Create and add safe area and clip path

  const areaWidth = Math.round(displayWidth * safeRatio);
  const areaHeight = Math.round(displayHeight * safeRatio);
  const areaLeft = Math.round((displayWidth - areaWidth) / 2);
  const areaTop = Math.round((displayHeight - areaHeight) / 2);

  const clipPath = new Rect({
   left: areaLeft,
   top: areaTop,
   width: areaWidth,
   height: areaHeight,
   absolutePositioned: true,
   selectable: false,
   evented: false,
  });

  const safeAreaVisible = new Rect({
   left: areaLeft,
   top: areaTop,
   width: areaWidth,
   height: areaHeight,
   fill: "white",
   stroke: "#ccc",
   strokeWidth: 0.5,
   selectable: false,
   evented: false,
   isClipArea: true,
  });

  newCanvas.clipPath = clipPath;
  newCanvas.add(safeAreaVisible); // Load initial front template

  if (designInfo?.frontTemplate) {
   newCanvas.loadFromJSON(designInfo.frontTemplate, () => {
    newCanvas.renderAll();
   });
   designContentRef.current.front = designInfo.frontTemplate;
  }
  if (designInfo?.backTemplate) {
   designContentRef.current.back = designInfo.backTemplate;
  }
  setCanvas(newCanvas);

  return () => {
   newCanvas.dispose();
  };
 }, [designInfo, canvas, setCanvas]); // Keyboard events

 useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
   if (!canvas) return;
   const activeObject = canvas.getActiveObject();
   if (
    e.key === "Delete" &&
    activeObject &&
    !(activeObject as any).isClipArea
   ) {
    canvas.remove(activeObject);
    canvas.renderAll();
    return;
   }
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    const obj = canvas.getActiveObject();
    if (!obj) return;
    e.preventDefault();
    const move = e.shiftKey ? 10 : 1;
    switch (e.key) {
     case "ArrowUp":
      obj.top! -= move;
      break;
     case "ArrowDown":
      obj.top! += move;
      break;
     case "ArrowLeft":
      obj.left! -= move;
      break;
     case "ArrowRight":
      obj.left! += move;
      break;
    }
    obj.setCoords();
    canvas.renderAll();
   }
  };
  document.addEventListener("keydown", handleKey);
  return () => document.removeEventListener("keydown", handleKey);
 }, [canvas]); // Handle the logic for switching between front and back

 const handleSwitch = (side: "front" | "back") => {
  if (!canvas) return; // 1. Save the current state of the canvas to the ref

  designContentRef.current[activeSide] = canvas.toJSON(); // 2. Load the new side's content

  const newContent = designContentRef.current[side];
  // canvas?.clear();
  if (newContent) {
   canvas.loadFromJSON(newContent, () => {
    canvas.renderAll();
   });
  } // 3. Update activeSide state to trigger a re-render
  setActiveSide(side);
 };

 const displayWidth = Math.round((designInfo?.width || 800) / 2);
 const displayHeight = Math.round((designInfo?.height || 600) / 2);

 return (
  <div className="w-full bg-secondary min-h-screen">
      <TopNavbar />   
   <div className="flex gap-4 items-start mt-6 px-6">
       {" "}
    <div>
          
     <div className="mb-2">
           {" "}
      <button
       className={`px-3 py-1 rounded mr-2 ${
        activeSide === "front"
         ? "bg-blue-600 text-white"
         : "bg-white text-black"
       }`}
       onClick={() => handleSwitch("front")}
      >
              Edit Front      {" "}
      </button>
           {" "}
      <button
       className={`px-3 py-1 rounded ${
        activeSide === "back" ? "bg-blue-600 text-white" : "bg-white text-black"
       }`}
       onClick={() => handleSwitch("back")}
      >
              Edit Back      {" "}
      </button>
           
     </div>
          
     <div className="text-black flex flex-col items-center justify-center pb-12">
            {/* Use a single canvas element */}     {" "}
      <canvas
       ref={canvasRef}
       className="border border-blue-600"
       width={displayWidth}
       height={displayHeight}
       style={{ display: "block" }}
      />
           
     </div>
        {" "}
    </div>
       
   </div>
    {" "}
  </div>
 );
};

export default CanvasEditor;
