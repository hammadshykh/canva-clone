import React, { useState } from "react";
import ShapesSettings from "../Sharable/ShapesSettings";
import { useCanvas } from "@/context/CanvasEditorContext";
import TextSettingsNavbar from "./TextSettingsNavbar";

const TopNavbar = () => {
 const { canvasEditor } = useCanvas();
 const [hasSelectedObject, setHasSelectedObject] = React.useState(false);
 const [enableTextSettings, setEnableTextSettings] = useState(false);

 React.useEffect(() => {
  if (!canvasEditor) return;

  // Initial check
  checkSelection();

  // Set up event listeners
  canvasEditor.on("selection:created", checkSelection);
  canvasEditor.on("selection:updated", checkSelection);
  canvasEditor.on("selection:cleared", checkSelection);

  return () => {
   // Clean up event listeners
   canvasEditor.off("selection:created", checkSelection);
   canvasEditor.off("selection:updated", checkSelection);
   canvasEditor.off("selection:cleared", checkSelection);
  };
 }, [canvasEditor]);

 const checkSelection = () => {
  const activeObject: any = canvasEditor?.getActiveObject();
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
