import React, { ChangeEvent, useState } from "react";
import ImageKit from "imagekit";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { Loader2Icon, CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { FabricImage } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";

const UploadImage: React.FC = () => {
 const { designId } = useParams();
 const [loading, setLoading] = useState(false);
 const { canvasEditor } = useCanvas();

 const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
 });

 const checkExistingImage = async (): Promise<boolean> => {
  try {
   const existingFiles = await imagekit.listFiles({
    name: `${designId}.png`,
    limit: 1,
   });
   return existingFiles.length > 0;
  } catch (error) {
   console.error("Error checking existing image:", error);
   return false;
  }
 };

 const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Check for existing image first
  setLoading(true);
  const checkingToastId = toast.loading("Checking for existing image...");

  try {
   const imageExists = await checkExistingImage();

   if (imageExists) {
    toast.dismiss(checkingToastId);
    toast.warning("Image already exists", {
     description: "An image with this design ID already exists",
     duration: 5000,
    });
    setLoading(false);
    return;
   }

   // Continue with upload if no existing image
   toast.loading("Uploading image...", {
    id: checkingToastId,
    description: "Please wait while we process your image",
    classNames: {
     description: "text-blue-400",
    },
   });

   const imageRef: any = await imagekit.upload({
    file: file as any,
    fileName: `${designId}.png`,
    isPublished: true,
    overwriteFile: false, // Prevent overwriting
    overwriteAITags: false,
    overwriteCustomMetadata: false,
   });

   console.log(imageRef, "image");

   const canvasImageRef = await FabricImage.fromURL(imageRef?.url, {
    crossOrigin: "anonymous",
   });

   // Calculate aspect ratio and set dimensions
   const aspectRatio = canvasImageRef.width / canvasImageRef.height;
   const maxWidth = 200;
   const maxHeight = 200;
   let newWidth = maxWidth;
   let newHeight = maxHeight;

   if (aspectRatio > 1) {
    newHeight = maxWidth / aspectRatio;
   } else {
    newWidth = maxHeight * aspectRatio;
   }

   canvasImageRef.set({
    width: newWidth,
    height: newHeight,
    scaleX: 1,
    scaleY: 1,
    left: (maxWidth - newWidth) / 2,
    top: (maxHeight - newHeight) / 2,
    originX: "center",
    originY: "center",
   });

   canvasEditor?.add(canvasImageRef);
   canvasEditor?.renderAll();

   toast.success("Upload successful!", {
    id: checkingToastId,
    description: "Your image has been uploaded successfully",
    duration: 5000,
    icon: <CheckCircle2Icon className="w-5 h-5 text-green-500" />,
   });
  } catch (error: any) {
   console.error("Upload failed:", error);

   let errorMessage = "There was an error uploading your image";
   if (error.message.includes("already exists")) {
    errorMessage = "An image with this design ID already exists";
   }

   toast.error("Upload failed", {
    id: checkingToastId,
    description: errorMessage,
    duration: 5000,
    icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
   });
  } finally {
   setLoading(false);
  }
 };

 return (
  <div>
   <div>
    <label htmlFor="uploadImage">
     <div className="p-2 bg-primary text-white rounded-md text-sm text-center cursor-pointer hover:bg-primary/90 transition-colors">
      {loading ? (
       <div className="flex items-center justify-center gap-2">
        <Loader2Icon className="w-4 h-4 animate-spin" />
        <span>Uploading...</span>
       </div>
      ) : (
       "Upload Image"
      )}
     </div>
    </label>
   </div>
   <Input
    type="file"
    id="uploadImage"
    accept="image/*"
    className="hidden"
    onChange={onFileUpload}
    disabled={loading}
   />
  </div>
 );
};

export default UploadImage;
