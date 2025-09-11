// pages or component where you render the editor, e.g. DesignEditor.tsx
"use client";
import { useParams } from "next/navigation";
import React from "react";
import DesignHeader from "../_components/DesignHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Sidebar from "../_components/Sidebar";
import CanvasEditor from "../_components/CanvasEditor";
import RightPreviewSidebar from "@/components/RightPreviewSidebar";
import { CanvasProviderForFrontEndBack } from "@/context/CanvasEditorContext";

const DesignEditor = () => {
 const { designId } = useParams();
 const DesignInfo = useQuery(api.designs.GetDesign, {
  id: designId as any,
 });

 return (
  <CanvasProviderForFrontEndBack>
   <div>
    <DesignHeader designInfo={DesignInfo} />
    <div className="flex">
     <Sidebar />
     <div className="flex-1">
      <CanvasEditor designInfo={DesignInfo} />
     </div>
     <RightPreviewSidebar />
    </div>
   </div>
  </CanvasProviderForFrontEndBack>
 );
};

export default DesignEditor;
