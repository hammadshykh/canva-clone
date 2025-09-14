"use client";

import React, { useState } from "react";
import Fabric3DCanvas from "./Fabric3DCanvas";
import Model3DViewer from "./Model";
import { Canvas3DProvider } from "./CanvasEditorContext";
import LeftSidebar from "./LeftSidebar";

export default function Canvas3DPage() {
 const [texture, setTexture] = useState<string>("");

 return (
  <Canvas3DProvider>
   <div className="w-full h-screen flex">
    {/* Left Sidebar */}
    <div className="w-1/5 border-r border-gray-300 p-2">
     <h2 className="font-bold mb-2">Shapes / Text</h2>
     <p>Add your objects here</p>

     <LeftSidebar />
    </div>

    {/* Center Fabric Canvas */}
    <div className="w-2/5 border-r border-gray-300 p-2">
     <Fabric3DCanvas onUpdateTexture={setTexture} />
    </div>

    {/* Right 3D Model Viewer */}
    <div className="w-2/5 p-2">
     <Model3DViewer textureDataURL={texture} />
    </div>
   </div>
  </Canvas3DProvider>
 );
}
