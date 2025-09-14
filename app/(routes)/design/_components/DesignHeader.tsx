"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@stackframe/stack";
import { Save, Loader2, Download } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageKit from "imagekit";
import { useCanvas } from "@/context/CanvasEditorContext";

const DesignHeader = ({ designInfo }: { designInfo: any }) => {
 const { canvas, activeSide, setActiveSide } = useCanvas();
 const { designId } = useParams();
 const [isSaving, setIsSaving] = useState(false);
 const [isExporting, setIsExporting] = useState(false);
 const [designName, setDesignName] = useState(designInfo?.name || "");
 const router = useRouter();

 const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
 });

 const saveDesignMutation = useMutation(api.designs.SaveDesign);

 const onHandleSave = async () => {
  if (!canvas || !designId) {
   toast.error("Canvas or design ID not available");
   return;
  }

  setIsSaving(true);
  const toastId = toast.loading("Saving design...");

  try {
   const base64Image = canvas.toDataURL({
    format: "png",
    quality: 0.8,
   } as any);

   // delete old file if exists
   const existingFiles: any = await imagekit.listFiles({
    searchQuery: `name="${designId}-${activeSide}.png"`,
   });

   if (existingFiles && existingFiles.length > 0) {
    for (const file of existingFiles) {
     try {
      await imagekit.deleteFile(file?.fileId);
     } catch (deleteError) {
      console.warn("Failed to delete old file:", deleteError);
     }
    }
   }

   const imageRef = await imagekit.upload({
    file: base64Image,
    fileName: `${designId}-${activeSide}.png`,
    isPublished: true,
    useUniqueFileName: false,
   });

   const jsonDesign = canvas.toJSON();

   await saveDesignMutation({
    id: designId as any,
    jsonDesign,
    imagePreview: imageRef.url,
   });

   toast.success("Design saved successfully!", {
    id: toastId,
    description: `Your ${activeSide} design has been saved`,
   });
  } catch (error) {
   console.error("Save failed:", error);
   toast.error("Failed to save design", {
    id: toastId,
    description:
     error instanceof Error ? error.message : "Please try again later",
   });
  } finally {
   setIsSaving(false);
  }
 };

 const handleExportPNG = async () => {
  if (!canvas) {
   toast.error("Canvas not available");
   return;
  }

  setIsExporting(true);
  const toastId = toast.loading("Exporting PNG...");

  try {
   const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1,
    multiplier: 2,
   });

   const link = document.createElement("a");
   link.href = dataURL;
   link.download = `${designName || "design"}-${activeSide}.png`;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);

   toast.success("PNG exported successfully!", {
    id: toastId,
    description: `Your ${activeSide} design has been downloaded`,
   });
  } catch (error) {
   console.error("Export failed:", error);
   toast.error("Failed to export PNG", {
    id: toastId,
    description: "Please try again later",
   });
  } finally {
   setIsExporting(false);
  }
 };

 return (
  <div className="flex justify-between items-center p-3 px-6 bg-gradient-to-r from-sky-500 via-blue-400 to-purple-500">
   <Image
    src={"/logo-white.png"}
    onClick={() => router.push("/workspace")}
    alt="logo"
    width={100}
    height={100}
    className="w-[100px] h-[40px] cursor-pointer"
   />

   <div>
    <Input
     placeholder="Design Name"
     value={designName}
     onChange={(e) => setDesignName(e.target.value)}
     className="border-0 text-white bg-transparent placeholder:text-white/70 focus:ring-0 w-60"
     disabled={isSaving}
    />
   </div>

   <div className="flex items-center gap-4">
    {/* Toggle between front/back */}
    <div className="flex gap-2">
     <Button
      variant={activeSide === "front" ? "default" : "outline"}
      onClick={() => setActiveSide("front")}
     >
      Front
     </Button>
     <Button
      variant={activeSide === "back" ? "default" : "outline"}
      onClick={() => setActiveSide("back")}
     >
      Back
     </Button>
    </div>

    <Button onClick={onHandleSave} disabled={isSaving} className="gap-2">
     {isSaving ? (
      <Loader2 className="w-4 h-4 animate-spin" />
     ) : (
      <Save className="w-4 h-4" />
     )}
     {isSaving ? "Saving..." : "Save"}
    </Button>

    <Button
     onClick={handleExportPNG}
     disabled={isExporting || !canvas}
     variant="outline"
     className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
    >
     {isExporting ? (
      <Loader2 className="w-4 h-4 animate-spin" />
     ) : (
      <Download className="w-4 h-4" />
     )}
     {isExporting ? "Exporting..." : "Export PNG"}
    </Button>

    <UserButton />
   </div>
  </div>
 );
};

export default DesignHeader;
