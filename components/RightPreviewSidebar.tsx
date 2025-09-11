"use client";
import React, { useEffect, useState, useRef } from "react";
import { useCanvas } from "@/context/CanvasEditorContext";
import ThreeDPreview from "./ThreeDPreview";

export default function RightPreviewSidebar() {
 const { frontCanvas, backCanvas } = useCanvas();
 const [frontUrl, setFrontUrl] = useState<string | undefined>(undefined);
 const [backUrl, setBackUrl] = useState<string | undefined>(undefined);
 const [aspect, setAspect] = useState<number>(1.8);
 const timeoutRef = useRef<number | null>(null);
 const [isFlipped, setIsFlipped] = useState(false);

 // helper to get clipped data url from a canvas instance
 const getClippedDataUrl = (c?: any) => {
  if (!c) return undefined;
  const clip: any = c.getObjects().find((o: any) => (o as any).isClipArea);
  if (clip) {
   const left = Math.round(clip.left);
   const top = Math.round(clip.top);
   const width = Math.round((clip.width ?? 0) * (clip.scaleX ?? 1));
   const height = Math.round((clip.height ?? 0) * (clip.scaleY ?? 1));
   try {
    return {
     url: c.toDataURL({
      left,
      top,
      width,
      height,
      format: "png",
      multiplier: 1,
      backgroundColor: "white", // ensure white behind transparent parts
     }),
     w: width,
     h: height,
    };
   } catch (e) {
    console.warn("toDataURL failed", e);
    return undefined;
   }
  } else {
   // fallback: full canvas export
   return {
    url: c.toDataURL({
     format: "png",
     multiplier: 1,
     backgroundColor: "white",
    }),
    w: c.getWidth(),
    h: c.getHeight(),
   };
  }
 };

 useEffect(() => {
  // update both previews when canvases change
  const updateBoth = () => {
   const f = getClippedDataUrl(frontCanvas);
   const b = getClippedDataUrl(backCanvas);
   if (f) {
    setFrontUrl(f.url);
    if (f.w && f.h) setAspect(f.w / f.h);
   }
   if (b) setBackUrl(b?.url);
  };

  // debounce helper
  const onChange = () => {
   if (timeoutRef.current) {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
   }
   timeoutRef.current = window.setTimeout(() => {
    updateBoth();
   }, 100);
  };

  // initial
  updateBoth();

  // subscribe events for both canvases
  frontCanvas?.on("object:moving", onChange);
  frontCanvas?.on("object:modified", onChange);
  frontCanvas?.on("object:added", onChange);
  backCanvas?.on("object:moving", onChange);
  backCanvas?.on("object:modified", onChange);
  backCanvas?.on("object:added", onChange);

  return () => {
   frontCanvas?.off?.("object:moving", onChange);
   frontCanvas?.off?.("object:modified", onChange);
   frontCanvas?.off?.("object:added", onChange);
   backCanvas?.off?.("object:moving", onChange);
   backCanvas?.off?.("object:modified", onChange);
   backCanvas?.off?.("object:added", onChange);
   if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };
 }, [frontCanvas, backCanvas]);

 const showFront = () => setIsFlipped(false);
 const showBack = () => setIsFlipped(true);

 return (
  <div className="w-[360px] border-l p-4 min-h-screen bg-white">
   <h3 className="font-medium mb-2">3D Preview</h3>
   <div className="w-full h-[360px] bg-gray-100 rounded overflow-hidden">
    <ThreeDPreview
     frontImageUrl={frontUrl}
     backImageUrl={backUrl}
     aspect={aspect}
     isFlipped={isFlipped}
    />
   </div>

   <div className="mt-3 flex gap-2">
    <button
     className="px-3 py-1 rounded bg-blue-600 text-white"
     onClick={showFront}
    >
     Show Front
    </button>
    <button
     className="px-3 py-1 rounded bg-green-600 text-white"
     onClick={showBack}
    >
     Show Back
    </button>
   </div>

   <div className="mt-4 text-sm text-gray-600">
    Preview maps front/back designs (safe area exports) to the 3D card.
   </div>
  </div>
 );
}
