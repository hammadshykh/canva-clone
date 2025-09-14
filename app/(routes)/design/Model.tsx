"use client";

import React, { useEffect, useState } from "react";
import { Canvas as R3FCanvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

type Props = {
 textureDataURL: string;
};

function Model({ textureDataURL }: Props) {
 const obj = useLoader(OBJLoader as any, "/teamugobj.obj"); // OBJ loader
 const [texture, setTexture] = useState<THREE.Texture>();

 useEffect(() => {
  if (!textureDataURL) return;
  const tex = new THREE.TextureLoader().load(textureDataURL);
  tex.needsUpdate = true;
  setTexture(tex);
 }, [textureDataURL]);

 useEffect(() => {
  if (texture && obj) {
   obj.traverse((child: any) => {
    if (child.isMesh) {
     child.material = new THREE.MeshStandardMaterial({ map: texture });
    }
   });
  }
 }, [texture, obj]);

 return <primitive object={obj} scale={1} />;
}

export default function Model3DViewer({ textureDataURL }: Props) {
 return (
  <R3FCanvas camera={{ position: [0, 1, 3], fov: 45 }}>
   <ambientLight intensity={0.6} />
   <directionalLight position={[0, 5, 5]} intensity={0.8} />
   <Model textureDataURL={textureDataURL} />
   <OrbitControls />
  </R3FCanvas>
 );
}
