import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";
import TopNavbar from "@/services/Components/TopNavbar";
const CanvasEditor = ({ designInfo }: { designInfo: any }) => {
 const canvasRef = useRef(null);
 //  const [canvas, setCanvas] = useState<any>(null);
 const { canvasEditor, setCanvasEditor } = useCanvas();

 /**
  * Used to init the canvas with default width and height
  */

 useEffect(() => {
  if (canvasRef.current && designInfo) {
   const initCanvas = new Canvas(canvasRef.current, {
    width: designInfo?.width / 2,
    height: designInfo?.height / 2,
    backgroundColor: "#fff",
    preserveObjectStacking: true,
   });

   //  Set High Resolution Canvas

   const scaleFactor = window.devicePixelRatio || 1;
   initCanvas.set({
    width: designInfo?.width * scaleFactor,
    height: designInfo?.height * scaleFactor,
    zoom: 1 / scaleFactor,
   });

   initCanvas.renderAll();
   //  setCanvas(initCanvas);
   setCanvasEditor(initCanvas as any);

   return () => {
    initCanvas.dispose();
   };
  }
 }, [designInfo]);

 useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
   if (event.key === "Delete") {
    if (canvasEditor) {
     const activeObject = canvasEditor.getActiveObject();
     if (activeObject) {
      canvasEditor.remove(activeObject);
      canvasEditor.renderAll();
     }
    }
   }
  };

  // Add event listener
  document.addEventListener("keydown", handleKeyDown);

  // Cleanup function - REMOVE event listener
  return () => {
   document.removeEventListener("keydown", handleKeyDown);
  };
 }, [canvasEditor]);

 return (
  <div className=" w-full bg-secondary min-h-screen ">
   <TopNavbar />
   <div className="text-black flex flex-col mt-10 items-center justify-center">
    <canvas id="canvas" ref={canvasRef} />
   </div>
  </div>
 );
};

export default CanvasEditor;
