"use client";
import React, { useEffect, useRef } from "react";
import { Canvas, Rect } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";
import TopNavbar from "@/services/Components/TopNavbar";

type Props = { designInfo: any };

const CanvasEditor = ({ designInfo }: Props) => {
 const canvasRefFront = useRef<HTMLCanvasElement | null>(null);
 const canvasRefBack = useRef<HTMLCanvasElement | null>(null);

 const {
  frontCanvas,
  backCanvas,
  setFrontCanvas,
  setBackCanvas,
  activeSide,
  setActiveSide,
 } = useCanvas();

 // safe area params
 const safeRatio = 0.6;
 const safeStroke = "#ccc";
 const safeStrokeWidth = 0.5;

 useEffect(() => {
  if (!designInfo) return;

  const displayWidth = Math.round((designInfo?.width || 800) / 2);
  const displayHeight = Math.round((designInfo?.height || 600) / 2);

  // helper to init one canvas (front or back)
  const initOne = (canvasEl: HTMLCanvasElement | null) => {
   if (!canvasEl) return undefined;

   const c = new Canvas(canvasEl, {
    width: displayWidth,
    height: displayHeight,
    backgroundColor: "transparent",
    preserveObjectStacking: true,
    selectionBorderColor: "#ccc",
   });

   // safe area
   const areaWidth = Math.round(displayWidth * safeRatio);
   const areaHeight = Math.round(displayHeight * safeRatio);
   const areaLeft = Math.round((displayWidth - areaWidth) / 2);
   const areaTop = Math.round((displayHeight - areaHeight) / 2);

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
    isClipArea: true, // 👈 mark kiya so RightPreviewSidebar identify kar sake
   }) as any;

   c.clipPath = new Rect({
    left: areaLeft,
    top: areaTop,
    width: areaWidth,
    height: areaHeight,
    absolutePositioned: true,
   });

   c.add(safeAreaVisible);
   c.bringObjectToFront(safeAreaVisible);

   return c;
  };

  // init front
  if (!frontCanvas && canvasRefFront.current) {
   const fc = initOne(canvasRefFront.current);
   setFrontCanvas(fc);
  }

  // init back
  if (!backCanvas && canvasRefBack.current) {
   const bc = initOne(canvasRefBack.current);
   setBackCanvas(bc);
  }

  // load templates if available
  if (designInfo?.frontTemplate && frontCanvas) {
   try {
    frontCanvas.loadFromJSON(designInfo.frontTemplate, () =>
     frontCanvas.renderAll()
    );
   } catch (e) {
    console.warn("Failed loading front template", e);
   }
  }
  if (designInfo?.backTemplate && backCanvas) {
   try {
    backCanvas.loadFromJSON(designInfo.backTemplate, () =>
     backCanvas.renderAll()
    );
   } catch (e) {
    console.warn("Failed loading back template", e);
   }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [designInfo, setFrontCanvas, setBackCanvas]);

 useEffect(() => {
  return () => {
   try {
    frontCanvas?.dispose();
   } catch {}
   try {
    backCanvas?.dispose();
   } catch {}
  };
 }, []);

 // keyboard events for active canvas
 useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
   const active = activeSide === "front" ? frontCanvas : backCanvas;
   if (!active) return;

   if (e.key === "Delete") {
    const obj = active.getActiveObject();
    if (obj) {
     active.remove(obj);
     active.renderAll();
    }
    return;
   }

   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    const obj = active.getActiveObject();
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
    active.renderAll();
   }
  };

  document.addEventListener("keydown", handleKey);
  return () => document.removeEventListener("keydown", handleKey);
 }, [frontCanvas, backCanvas, activeSide]);

 // toggle events when switching
 useEffect(() => {
  if (frontCanvas && backCanvas) {
   if (activeSide === "front") {
    frontCanvas.selection = true;
    frontCanvas.forEachObject((o) => (o.evented = true));
    backCanvas.selection = false;
    backCanvas.discardActiveObject();
    backCanvas.forEachObject((o) => (o.evented = false));
   } else {
    backCanvas.selection = true;
    backCanvas.forEachObject((o) => (o.evented = true));
    frontCanvas.selection = false;
    frontCanvas.discardActiveObject();
    frontCanvas.forEachObject((o) => (o.evented = false));
   }
  }
 }, [activeSide, frontCanvas, backCanvas]);

 const handleSwitch = (side: "front" | "back") => {
  setActiveSide(side);
 };

 return (
  <div className="w-full bg-secondary min-h-screen">
   <TopNavbar />
   <div className="flex gap-4 items-start mt-6 px-6">
    <div>
     <div className="mb-2">
      <button
       className={`px-3 py-1 rounded mr-2 ${
        activeSide === "front"
         ? "bg-blue-600 text-white"
         : "bg-white text-black"
       }`}
       onClick={() => handleSwitch("front")}
      >
       Edit Front
      </button>
      <button
       className={`px-3 py-1 rounded ${
        activeSide === "back" ? "bg-blue-600 text-white" : "bg-white text-black"
       }`}
       onClick={() => handleSwitch("back")}
      >
       Edit Back
      </button>
     </div>

     <div className="text-black flex flex-col items-center justify-center pb-12">
      <canvas
       id="canvas-front"
       ref={canvasRefFront}
       style={{ display: activeSide === "front" ? "block" : "none" }}
       className="border border-blue-600"
      />
      <canvas
       id="canvas-back"
       ref={canvasRefBack}
       style={{ display: activeSide === "back" ? "block" : "none" }}
       className="border border-blue-600"
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default CanvasEditor;
