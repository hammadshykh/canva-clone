import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";
import TopNavbar from "@/services/Components/TopNavbar";

const CanvasEditor = ({ designInfo }: { designInfo: any }) => {
 const canvasRef = useRef(null);
 const { canvasEditor, setCanvasEditor } = useCanvas();
 const [history, setHistory] = useState<string[]>([]);
 const [historyIndex, setHistoryIndex] = useState(-1);

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
     // Save initial state to history
     saveToHistory(initCanvas);
    });
   } else {
    saveToHistory(initCanvas);
   }

   initCanvas.renderAll();
   setCanvasEditor(initCanvas);

   // Setup event listeners for history tracking
   initCanvas.on("object:modified", () => saveToHistory(initCanvas));
   initCanvas.on("object:added", () => saveToHistory(initCanvas));
   initCanvas.on("object:removed", () => saveToHistory(initCanvas));

   return () => {
    initCanvas.off("object:modified");
    initCanvas.off("object:added");
    initCanvas.off("object:removed");
    initCanvas.dispose();
   };
  }
 }, [designInfo]);

 // Save canvas state to history
 const saveToHistory = (canvas: Canvas) => {
  const json = JSON.stringify(canvas.toJSON());
  setHistory((prev) => {
   const newHistory = prev.slice(0, historyIndex + 1);
   newHistory.push(json);
   return newHistory;
  });
  setHistoryIndex((prev) => prev + 1);
 };

 // Undo functionality
 const undo = () => {
  if (historyIndex > 0 && canvasEditor) {
   const newIndex = historyIndex - 1;
   setHistoryIndex(newIndex);
   canvasEditor.loadFromJSON(JSON.parse(history[newIndex]), () => {
    canvasEditor.renderAll();
   });
  }
 };

 // Redo functionality
 const redo = () => {
  if (historyIndex < history.length - 1 && canvasEditor) {
   const newIndex = historyIndex + 1;
   setHistoryIndex(newIndex);
   canvasEditor.loadFromJSON(JSON.parse(history[newIndex]), () => {
    canvasEditor.renderAll();
   });
  }
 };

 // Keyboard event handler
 useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
   if (!canvasEditor) return;

   // Delete key
   if (event.key === "Delete" || event.key === "Backspace") {
    const activeObject = canvasEditor.getActiveObject();
    if (activeObject) {
     canvasEditor.remove(activeObject);
     canvasEditor.renderAll();
    }
   }

   // Undo (Ctrl+Z)
   if ((event.ctrlKey || event.metaKey) && event.key === "z") {
    event.preventDefault();
    if (event.shiftKey) {
     redo(); // Ctrl+Shift+Z for redo
    } else {
     undo(); // Ctrl+Z for undo
    }
   }

   // Redo (Ctrl+Y)
   if ((event.ctrlKey || event.metaKey) && event.key === "y") {
    event.preventDefault();
    redo();
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
 }, [canvasEditor, undo, redo]);

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
