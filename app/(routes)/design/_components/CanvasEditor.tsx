import React, { useEffect, useRef } from "react";
import { Canvas } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";
import TopNavbar from "@/services/Components/TopNavbar";

const CanvasEditor = ({ designInfo }: { designInfo: any }) => {
 const canvasRef = useRef(null);
 const { canvasEditor, setCanvasEditor } = useCanvas();

 // Initialize canvas
 useEffect(() => {
  if (canvasRef.current && designInfo) {
   const initCanvas = new Canvas(canvasRef.current, {
    width: designInfo?.width / 2,
    height: designInfo?.height / 2,
    backgroundColor: "#fff",
    preserveObjectStacking: true,
   });

   const scaleFactor = window.devicePixelRatio || 1;
   initCanvas.set({
    width: designInfo?.width * scaleFactor,
    height: designInfo?.height * scaleFactor,
    zoom: 1 / scaleFactor,
   });

   // Load from template if exists
   if (designInfo?.jsonTemplate) {
    initCanvas.loadFromJSON(designInfo.jsonTemplate, () => {
     initCanvas.requestRenderAll();
    });
   }

   initCanvas.renderAll();
   setCanvasEditor(initCanvas);

   return () => {
    initCanvas.dispose();
   };
  }
 }, [designInfo]);

 // Keyboard event handler
 useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
   if (!canvasEditor) return;

   // Delete key
   if (event.key === "Delete") {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
     canvasEditor.remove(activeObject);
     canvasEditor.renderAll();
    }
    return;
   }

   // Arrow key movement
   if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
   ) {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
     event.preventDefault();
     const moveDistance = event.shiftKey ? 10 : 1; // Shift for larger moves

     switch (event.key) {
      case "ArrowUp":
       activeObject.top -= moveDistance;
       break;
      case "ArrowDown":
       activeObject.top += moveDistance;
       break;
      case "ArrowLeft":
       activeObject.left -= moveDistance;
       break;
      case "ArrowRight":
       activeObject.left += moveDistance;
       break;
     }

     activeObject.setCoords();
     canvasEditor.renderAll();
    }
   }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
 }, [canvasEditor]);

 return (
  <div className="w-full bg-secondary min-h-screen">
   <TopNavbar />
   <div className="text-black flex flex-col mt-10 items-center justify-center">
    <canvas id="canvas" ref={canvasRef} />
   </div>
  </div>
 );
};

export default CanvasEditor;
