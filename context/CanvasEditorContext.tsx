"use client";
import { Canvas } from "fabric";
import {
 createContext,
 useContext,
 ReactNode,
 Dispatch,
 SetStateAction,
 useState,
} from "react";

type CanvasEditorType = Canvas;

type CanvasContextType = {
 canvasEditor: CanvasEditorType | undefined;
 setCanvasEditor: Dispatch<SetStateAction<CanvasEditorType | undefined>>;
};

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
 const [canvasEditor, setCanvasEditor] = useState<CanvasEditorType>();

 return (
  <CanvasContext.Provider value={{ canvasEditor, setCanvasEditor }}>
   {children}
  </CanvasContext.Provider>
 );
};

export const useCanvas = (): CanvasContextType => {
 const context = useContext(CanvasContext);
 if (!context) {
  throw new Error("useCanvas must be used within a CanvasProvider");
 }
 return context;
};
