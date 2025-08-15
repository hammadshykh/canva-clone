"use client";
import { useParams } from "next/navigation";
import React from "react";
import DesignHeader from "../_components/DesignHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Sidebar from "../_components/Sidebar";

const DesignEditor = () => {
 const { designId } = useParams();
 const DesignInfo = useQuery(api.designs.GetDesign, {
  id: designId as any,
 });
 return (
  <div>
   <DesignHeader designInfo={DesignInfo} />
   <Sidebar />
  </div>
 );
};

export default DesignEditor;
