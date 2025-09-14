"use client";

import React from "react";
import { Rect, Circle } from "fabric";
import { useCanvas3D } from "./CanvasEditorContext";

export default function LeftSidebar() {
 const { canvas3D } = useCanvas3D();

 const addRectangle = () => {
  if (!canvas3D) return;
  const rect = new Rect({
   left: 50,
   top: 50,
   fill: "red",
   width: 100,
   height: 50,
  });
  canvas3D.add(rect);
  canvas3D.setActiveObject(rect);
  canvas3D.renderAll();
 };

 const addCircle = () => {
  if (!canvas3D) return;
  const circle = new Circle({
   left: 100,
   top: 100,
   radius: 40,
   fill: "green",
  });
  canvas3D.add(circle);
  canvas3D.setActiveObject(circle);
  canvas3D.renderAll();
 };

 return (
  <div className="w-64 border-r p-4 bg-white flex flex-col gap-2">
   <h3 className="font-medium mb-2">Add Shapes</h3>
   <button
    className="bg-blue-600 text-white px-3 py-1 rounded"
    onClick={addRectangle}
   >
    Add Rectangle
   </button>
   <button
    className="bg-green-600 text-white px-3 py-1 rounded"
    onClick={addCircle}
   >
    Add Circle
   </button>
  </div>
 );
}
