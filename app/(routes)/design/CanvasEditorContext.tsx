"use client";
import React, {
 createContext,
 useContext,
 useState,
 useCallback,
 useMemo,
 ReactNode,
} from "react";
import type { Canvas as FabricCanvas } from "fabric";

type CanvasContextType = {
 canvas3D?: FabricCanvas;
 setCanvas3D: (c?: FabricCanvas) => void;
};

const Canvas3DContext = createContext<CanvasContextType | undefined>(undefined);

export const Canvas3DProvider = ({ children }: { children: ReactNode }) => {
 const [canvas3D, setCanvasState] = useState<FabricCanvas | undefined>(
  undefined
 );

 const setCanvas3D = useCallback((c?: FabricCanvas) => {
  setCanvasState(c);
 }, []);

 const contextValue = useMemo(
  () => ({ canvas3D, setCanvas3D }),
  [canvas3D, setCanvas3D]
 );

 return (
  <Canvas3DContext.Provider value={contextValue}>
   {children}
  </Canvas3DContext.Provider>
 );
};

export const useCanvas3D = () => {
 const ctx = useContext(Canvas3DContext);
 if (!ctx) throw new Error("useCanvas3D must be used inside Canvas3DProvider");
 return ctx;
};
