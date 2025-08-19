"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCanvas } from "@/context/CanvasEditorContext";
import { UserButton } from "@stackframe/stack";
import { Save, Loader2, Download } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageKit from "imagekit";

const DesignHeader = ({ designInfo }: { designInfo: any }) => {
 const { canvasEditor } = useCanvas();
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
  if (!canvasEditor || !designId) {
   toast.error("Canvas or design ID not available");
   return;
  }

  setIsSaving(true);
  const toastId = toast.loading("Saving design...");

  try {
   const base64Image = canvasEditor.toDataURL({
    format: "png",
    quality: 0.8,
   } as any);

   // Get List of Files
   const existingFiles: any = await imagekit.listFiles({
    searchQuery: `name="${designId}.png"`,
   });

   // Delete Old files if they exist
   if (existingFiles && existingFiles.length > 0) {
    for (const file of existingFiles) {
     try {
      await imagekit.deleteFile(file?.fileId);
     } catch (deleteError) {
      console.warn("Failed to delete old file:", deleteError);
     }
    }
   }

   // Upload new image
   const imageRef = await imagekit.upload({
    file: base64Image,
    fileName: `${designId}.png`,
    isPublished: true,
    useUniqueFileName: false,
   });

   const jsonDesign = canvasEditor.toJSON();

   const result = await saveDesignMutation({
    id: designId as any,
    jsonDesign: jsonDesign,
    imagePreview: imageRef.url,
   });

   toast.success("Design saved successfully!", {
    id: toastId,
    description: "Your changes have been saved",
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
  if (!canvasEditor) {
   toast.error("Canvas not available");
   return;
  }

  setIsExporting(true);
  const toastId = toast.loading("Exporting PNG...");

  try {
   const dataURL = canvasEditor.toDataURL({
    format: "png",
    quality: 1,
    multiplier: 2,
   });

   const link = document.createElement("a");
   link.href = dataURL;
   link.download = `${designName || "design"}.png`;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);

   toast.success("PNG exported successfully!", {
    id: toastId,
    description: "Your design has been downloaded",
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

 const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setDesignName(e.target.value);
 };

 return (
  <div className="flex justify-between items-center p-3 px-6 bg-gradient-to-r from-sky-500 via-blue-400 to-purple-500">
   <Image
    src={"/logo-white.png"}
    onClick={() => router.push("/workspace")}
    alt="logo"
    width={100}
    height={100}
    className="w-[100px] h-[40px]"
   />

   <div>
    <Input
     placeholder="Design Name"
     value={designName}
     onChange={handleNameChange}
     className="border-0 text-white bg-transparent placeholder:text-white/70 focus:ring-0 w-60"
     disabled={isSaving}
    />
   </div>

   <div className="flex items-center gap-4">
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
     disabled={isExporting || !canvasEditor}
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
