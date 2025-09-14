import React, { useState } from "react";
import ShapesSettings from "../Sharable/ShapesSettings";
import TextSettingsNavbar from "./TextSettingsNavbar";
import { useCanvas } from "@/context/CanvasEditorContext";

const TopNavbar = () => {
 const { canvas, activeSide } = useCanvas();

 const [hasSelectedObject, setHasSelectedObject] = React.useState(false);
 const [enableTextSettings, setEnableTextSettings] = useState(false);

 React.useEffect(() => {
  if (!canvas) return;

  // Initial check
  checkSelection();

  // Set up event listeners
  canvas.on("selection:created", checkSelection);
  canvas.on("selection:updated", checkSelection);
  canvas.on("selection:cleared", checkSelection);

  return () => {
   // Clean up event listeners
   canvas.off("selection:created", checkSelection);
   canvas.off("selection:updated", checkSelection);
   canvas.off("selection:cleared", checkSelection);
  };
 }, [canvas]);

 const checkSelection = () => {
  const activeObject: any = canvas?.getActiveObject();
  if (!activeObject?.text) {
   setHasSelectedObject(true);
   setEnableTextSettings(false);
  }
  if (activeObject?.text) {
   setEnableTextSettings(true);
   setHasSelectedObject(false);
  }
 };

 return (
  <div className="p-3 bg-white">
   {hasSelectedObject && <ShapesSettings />}
   {enableTextSettings && <TextSettingsNavbar />}
  </div>
 );
};

export default TopNavbar;
