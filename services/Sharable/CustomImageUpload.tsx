import { ImageUp, X, Plus, Loader2 } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useCanvas } from "@/context/CanvasEditorContext";
import { toast } from "sonner";
import { FabricImage } from "fabric";
import ImageKit from "imagekit";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const imagekit = new ImageKit({
 publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
 privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
 urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const CustomImageUpload = ({ selectedAi }: { selectedAi: any }) => {
 const [imageUrl, setImageUrl] = useState<string | null>(
  "https://ik.imagekit.io/ikmedia/docs_images/old-docs-images/Eiffel%20Tower.jpg"
 );
 const [isAddingToCanvas, setIsAddingToCanvas] = useState(false);
 const [loading, setLoading] = useState(false);
 const [imageError, setImageError] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const { canvasEditor } = useCanvas();
 const { designId } = useParams();

 // Handle image upload to ImageKit
 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setLoading(true);
  const toastId = toast.loading("Uploading image...");

  try {
   const imageRef: any = await imagekit.upload({
    file: file as any,
    fileName: `${designId}-${Date.now()}.png`, // Unique filename
    isPublished: true,
   });

   setImageUrl(imageRef.url);
   setImageError(false);
   toast.success("Image uploaded successfully!", { id: toastId });
  } catch (error) {
   console.error("Upload failed:", error);
   toast.error("Failed to upload image", { id: toastId });
  } finally {
   setLoading(false);
  }
 };

 // Add image to canvas
 const handleAddToCanvas = async () => {
  if (!imageUrl || !canvasEditor) return;

  setIsAddingToCanvas(true);
  const toastId = toast.loading("Adding image to canvas...");

  try {
   const img = await FabricImage.fromURL(imageUrl, {
    crossOrigin: "anonymous",
   });

   // Calculate dimensions to fit canvas
   const maxSize = Math.min(canvasEditor.width!, canvasEditor.height!) * 0.8;
   let width = img.width ?? maxSize;
   let height = img.height ?? maxSize;

   if (width > height) {
    if (width > maxSize) {
     height = (maxSize / width) * height;
     width = maxSize;
    }
   } else {
    if (height > maxSize) {
     width = (maxSize / height) * width;
     height = maxSize;
    }
   }

   img.set({
    left: canvasEditor.width! / 2 - width / 2,
    top: canvasEditor.height! / 2 - height / 2,
    scaleX: width / (img.width ?? width),
    scaleY: height / (img.height ?? height),
    originX: "center",
    originY: "center",
   });

   canvasEditor.add(img);
   canvasEditor.setActiveObject(img);
   canvasEditor.renderAll();

   toast.success("Image added to canvas!", { id: toastId });
  } catch (error) {
   console.error("Error adding image:", error);
   toast.error("Failed to add image to canvas", { id: toastId });
  } finally {
   setIsAddingToCanvas(false);
  }
 };

 const handleRemoveImage = () => {
  setImageUrl(null);
  setImageError(false);
  if (fileInputRef.current) {
   fileInputRef.current.value = "";
  }
 };

 // Apply AI transformations when selected
 useEffect(() => {
  if (selectedAi) {
   let image = imageUrl;
   if (image?.includes("?tr=")) {
    image = imageUrl + "," + selectedAi.command;
   } else {
    image = imageUrl + "?tr=" + selectedAi.command;
   }
   console.log(imageUrl);
   setImageUrl(image);
  }
 }, [selectedAi]);

 return (
  <div className="relative">
   {imageUrl ? (
    <>
     <div className="group relative h-[100px] w-full rounded-xl overflow-hidden bg-gray-100">
      {!imageError ? (
       <Image
        src={imageUrl}
        alt="Uploaded preview"
        fill
        className="object-cover"
        onError={() => setImageError(true)}
       />
      ) : (
       <div className="w-full h-full flex items-center justify-center bg-red-50">
        <X className="text-red-500" />
       </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
       <button
        onClick={handleAddToCanvas}
        disabled={isAddingToCanvas}
        className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
        aria-label="Add to canvas"
       >
        {isAddingToCanvas ? (
         <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : (
         <Plus className="w-4 h-4 text-white" />
        )}
       </button>
       <button
        onClick={handleRemoveImage}
        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
        aria-label="Remove image"
       >
        <X className="w-4 h-4 text-white" />
       </button>
      </div>
     </div>
     <Button
      className="w-full mt-2"
      onClick={handleAddToCanvas}
      disabled={isAddingToCanvas || imageError}
     >
      {isAddingToCanvas ? (
       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : null}
      Add to Canvas
     </Button>
    </>
   ) : (
    <label className="flex flex-col items-center justify-center p-4 rounded-xl h-[100px] mb-4 cursor-pointer bg-secondary hover:bg-secondary/80 transition-colors">
     {loading ? (
      <Loader2 className="w-5 h-5 animate-spin" />
     ) : (
      <>
       <ImageUp className="w-5 h-5 mb-1" />
       <h2 className="text-xs">Upload Image</h2>
      </>
     )}
     <input
      ref={fileInputRef}
      type="file"
      id="uploadImage"
      className="hidden"
      onChange={handleImageUpload}
      accept="image/*"
      disabled={loading}
     />
    </label>
   )}
  </div>
 );
};

export default CustomImageUpload;
