"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Textbox, FabricObject } from "fabric";
import { useCanvas3D } from "./CanvasEditorContext";

type Props = {
 onUpdateTexture: (dataURL: string) => void; // callback to update 3D model
};

export default function Fabric3DCanvas({ onUpdateTexture }: Props) {
 const canvasRef = useRef<Canvas | null>(null);
 const containerRef = useRef<HTMLDivElement>(null);
 const { setCanvas3D } = useCanvas3D(); // context setter

 const [editableArea, setEditableArea] = useState<Rect | null>(null);

 useEffect(() => {
  if (!containerRef.current) return;

  // Initialize Fabric canvas
  const canvas = new Canvas("fabricCanvas", {
   width: 500,
   height: 500,
   backgroundColor: "#ccc",
   preserveObjectStacking: true,
  });
  canvasRef.current = canvas;

  // Share canvas with context for sidebar
  setCanvas3D(canvas);

  // Editable area rectangle
  const area = new Rect({
   left: 100,
   top: 100,
   width: 300,
   height: 300,
   fill: "#ccc",
   stroke: "blue",
   strokeDashArray: [5, 5],
   selectable: false,
  });
  canvas.add(area);
  canvas.sendObjectToBack(area);
  canvas.clipPath = area;
  setEditableArea(area);

  // Sample text
  const text = new Textbox("Drag me inside blue area", {
   left: 150,
   top: 150,
   width: 200,
   fontSize: 18,
   fill: "red",
  });
  canvas.add(text);

  // Restrict movement inside editable area
  canvas.on("object:moving", (e) => {
   const obj = e.target as FabricObject;
   if (!obj || !area) return;

   const bounds = obj.getBoundingRect();
   if (
    bounds.left < area.left! ||
    bounds.top < area.top! ||
    bounds.left + bounds.width > area.left! + area.width! ||
    bounds.top + bounds.height > area.top! + area.height!
   ) {
    obj.left = Math.min(
     Math.max(obj.left!, area.left!),
     area.left! + area.width! - bounds.width
    );
    obj.top = Math.min(
     Math.max(obj.top!, area.top!),
     area.top! + area.height! - bounds.height
    );
   }
  });

  // Restrict scaling/resize outside editable area
  canvas.on("object:scaling", (e) => {
   const obj = e.target as FabricObject;
   if (!obj || !area) return;

   const bounds = obj.getBoundingRect();
   if (
    bounds.left < area.left! ||
    bounds.top < area.top! ||
    bounds.left + bounds.width > area.left! + area.width! ||
    bounds.top + bounds.height > area.top! + area.height!
   ) {
    obj.scaleX = Math.min(
     obj.scaleX!,
     (area.width! - (obj.left! - area.left!)) / obj.width!
    );
    obj.scaleY = Math.min(
     obj.scaleY!,
     (area.height! - (obj.top! - area.top!)) / obj.height!
    );
   }
  });

  // Update texture only on object changes
  const updateTexture = () => {
   if (!canvas) return;
   const dataURL = canvas.toDataURL({ format: "jpeg", multiplier: 1 }); // fix TS type
   onUpdateTexture(dataURL);
  };
  canvas.on("object:modified", updateTexture);
  canvas.on("object:added", updateTexture);
  canvas.on("object:removed", updateTexture);

  return () => {
   canvas.dispose();
  };
 }, [onUpdateTexture, setCanvas3D]);

 return (
  <div
   ref={containerRef}
   className="w-full h-full flex justify-center items-center border border-gray-300"
  >
   <canvas id="fabricCanvas" className="border border-black" />
  </div>
 );
}
