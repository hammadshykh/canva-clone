"use client";
import { useParams } from "next/navigation";
import React from "react";
import DesignHeader from "../_components/DesignHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Sidebar from "../_components/Sidebar";
import CanvasEditor from "../_components/CanvasEditor";
import { CanvasProvider } from "@/context/CanvasEditorContext";

const DesignEditor = () => {
 const { designId } = useParams();
 const DesignInfo = useQuery(api.designs.GetDesign, {
  id: designId as any, // Consider using proper type here
 });

 return (
  <CanvasProvider>
   <div>
    <DesignHeader designInfo={DesignInfo} />
    <div className="flex">
     <Sidebar />
     <CanvasEditor designInfo={DesignInfo} />
    </div>
   </div>
  </CanvasProvider>
 );
};

export default DesignEditor;
