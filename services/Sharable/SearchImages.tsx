import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { FabricImage } from "fabric";
import { useCanvas } from "@/context/CanvasEditorContext";

interface UnsplashImage {
 id: string;
 urls: {
  regular: string;
  thumb: string;
 };
 alt_description?: string;
 width: number;
 height: number;
}

const SearchImages = () => {
 const [query, setQuery] = useState("");
 const [images, setImages] = useState<UnsplashImage[]>([]);
 const [loading, setLoading] = useState(false);
 const [page, setPage] = useState(1);
 const { canvasEditor } = useCanvas();
 const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

 const searchImages = async (resetPage = true) => {
  if (!query.trim()) {
   toast.warning("Please enter a search term");
   return;
  }

  try {
   setLoading(true);
   const currentPage = resetPage ? 1 : page + 1;

   const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${currentPage}&per_page=12&client_id=${accessKey}`
   );

   if (!response.ok) throw new Error("Failed to fetch images");
   const data = await response.json();

   if (resetPage) {
    setImages(data.results);
    setPage(1);
   } else {
    setImages((prev) => [...prev, ...data.results]);
    setPage(currentPage);
   }
  } catch (error) {
   console.error("Error searching images:", error);
   toast.error("Failed to search images. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 const handleAddImageToCanvas = async (image: UnsplashImage) => {
  if (!canvasEditor) {
   toast.error("Canvas not initialized");
   return;
  }

  try {
   //  toast.loading("Adding image to canvas...");

   // Use regular URL for better quality
   const img = await FabricImage.fromURL(image.urls.regular, {
    crossOrigin: "anonymous",
   });

   // Calculate dimensions to fit canvas (max 500px while maintaining aspect ratio)
   const maxSize = 500;
   let width = image.width;
   let height = image.height;

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
    scaleX: width / img.width!,
    scaleY: height / img.height!,
    originX: "center",
    originY: "center",
    name: `unsplash-${image.id}`,
   });

   canvasEditor.add(img);
   canvasEditor.renderAll();
   //  canvasEditor.setActiveObject(img);
   canvasEditor.requestRenderAll();

   toast.success("Image added to canvas!");
  } catch (error) {
   console.error("Error adding image:", error);
   toast.error("Failed to add image to canvas");
  }
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  searchImages(true);
 };

 const handleLoadMore = () => {
  searchImages(false);
 };

 return (
  <div className="">
   <form onSubmit={handleSubmit} className="flex gap-2 my-6">
    <Input
     type="text"
     value={query}
     onChange={(e) => setQuery(e.target.value)}
     placeholder="Search for images..."
     className="flex-1"
    />
    <Button type="submit" disabled={loading}>
     {loading ? (
      <Loader2 className="animate-spin" />
     ) : (
      <Search className="w-4 h-4" />
     )}
    </Button>
   </form>

   {images.length > 0 ? (
    <>
     <div className="grid grid-cols-2 gap-2 mb-6 h-[70vh] overflow-auto">
      {images.map((image) => (
       <div
        key={image.id}
        className="relative w-full h-20 overflow-hidden rounded-lg group"
        onClick={() => handleAddImageToCanvas(image)}
       >
        <Image
         src={image.urls.thumb}
         alt={image.alt_description || "Unsplash image"}
         fill
         className="object-cover transition-transform cursor-pointer group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 cursor-pointer group-hover:opacity-30 transition-all flex items-center justify-center">
         <span className="text-white opacity-0 group-hover:opacity-100 group-hover:bg-opacity-30transition-opacity text-sm font-medium">
          Add to Canvas
         </span>
        </div>
       </div>
      ))}
     </div>

     <div className="flex justify-center">
      <Button onClick={handleLoadMore} disabled={loading} variant="outline">
       {loading ? "Loading..." : "Load More"}
      </Button>
     </div>
    </>
   ) : (
    <div className="flex flex-col items-center justify-center py-12 text-center">
     <Search className="w-12 h-12 text-gray-400 mb-4" />
     <h3 className="text-lg font-medium">
      {loading ? "Searching..." : "Search for images to get started"}
     </h3>
     <p className="text-sm text-gray-500 mt-2">
      Try searching for "nature", "architecture", or anything else!
     </p>
    </div>
   )}
  </div>
 );
};

export default SearchImages;
