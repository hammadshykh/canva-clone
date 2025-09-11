"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Canvas as FabricCanvas } from "fabric";

type Side = "front" | "back";

type CanvasContextType = {
 frontCanvas?: FabricCanvas;
 backCanvas?: FabricCanvas;
 activeSide: Side;
 setFrontCanvas: (c?: FabricCanvas) => void;
 setBackCanvas: (c?: FabricCanvas) => void;
 setActiveSide: (s: Side) => void;
 // helpers
 getCanvasBySide: (s?: Side) => FabricCanvas | undefined;
 currentEditor?: FabricCanvas; // <--- NEW
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProviderForFrontEndBack = ({
 children,
}: {
 children: ReactNode;
}) => {
 const [frontCanvas, setFront] = useState<FabricCanvas | undefined>(undefined);
 const [backCanvas, setBack] = useState<FabricCanvas | undefined>(undefined);
 const [activeSide, setActive] = useState<Side>("front");

 const getCanvasBySide = (s?: Side) =>
  (s ?? activeSide) === "front" ? frontCanvas : backCanvas;

 const currentEditor = getCanvasBySide();

 return (
  <CanvasContext.Provider
   value={{
    frontCanvas,
    backCanvas,
    activeSide,
    setFrontCanvas: setFront,
    setBackCanvas: setBack,
    setActiveSide: setActive,
    getCanvasBySide,
    currentEditor, // expose active canvas
   }}
  >
   {children}
  </CanvasContext.Provider>
 );
};

export const useCanvas = () => {
 const ctx = useContext(CanvasContext);
 if (!ctx) throw new Error("useCanvas must be used inside CanvasProvider");
 return ctx;
};
