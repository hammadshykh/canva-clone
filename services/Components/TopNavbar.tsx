import React from "react";
import ShapesSettings from "../Sharable/ShapesSettings";
import { useCanvas } from "@/context/CanvasEditorContext";

const TopNavbar = () => {
 const { canvasEditor } = useCanvas();
 const [hasSelectedObject, setHasSelectedObject] = React.useState(false);

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
  const activeObject = canvasEditor?.getActiveObject();
  setHasSelectedObject(!!activeObject);
 };

 return (
  <div className="p-3 bg-white">{hasSelectedObject && <ShapesSettings />}</div>
 );
};

export default TopNavbar;
