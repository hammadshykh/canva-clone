import React, { useState } from "react";
import ColorPickerEditor from "../Sharable/ColorPickerEditor";
import { useCanvas } from "@/context/CanvasEditorContext";

const BackgroundSetting = () => {
 const [bgColor, setBgColor] = useState("#fff");
 const { canvasEditor } = useCanvas();

 const onColorChange = (color: any) => {
  setBgColor(color);
  canvasEditor?.set({
   backgroundColor: color,
   backgroundImage: null,
  });
  canvasEditor?.renderAll();
 };
 return (
  <div>
   <ColorPickerEditor value={bgColor} onColorChange={(v) => onColorChange(v)} />
  </div>
 );
};

export default BackgroundSetting;
