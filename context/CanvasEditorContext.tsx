"use client";
import React, {
 createContext,
 useContext,
 useState,
 ReactNode,
 useCallback,
 useMemo,
} from "react";
import type { Canvas as FabricCanvas } from "fabric";

type Side = "front" | "back";

type CanvasContextType = {
 canvas?: FabricCanvas;
 activeSide: Side;
 setCanvas: (c?: FabricCanvas) => void;
 setActiveSide: (s: Side) => void;
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProviderForFrontEndBack = ({
 children,
}: {
 children: ReactNode;
}) => {
 const [canvas, setCanvasState] = useState<FabricCanvas | undefined>(undefined);
 const [activeSide, setActive] = useState<Side>("front");

 const setCanvas = useCallback((c?: FabricCanvas) => {
  setCanvasState(c);
 }, []);

 const setActiveSide = useCallback((s: Side) => {
  setActive(s);
 }, []);

 const contextValue = useMemo(
  () => ({
   canvas,
   activeSide,
   setCanvas,
   setActiveSide,
  }),
  [canvas, activeSide, setCanvas, setActiveSide]
 );

 return (
  <CanvasContext.Provider value={contextValue}>
      {children} {" "}
  </CanvasContext.Provider>
 );
};

export const useCanvas = () => {
 const ctx = useContext(CanvasContext);
 if (!ctx) throw new Error("useCanvas must be used inside CanvasProvider");
 return ctx;
};
