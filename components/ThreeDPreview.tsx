"use client";
import React, { useRef } from "react";
import { Canvas as R3FCanvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type Props = {
 frontImageUrl?: string | undefined;
 backImageUrl?: string | undefined;
 aspect?: number;
 isFlipped?: boolean;
};

function CardPair({
 frontImageUrl,
 backImageUrl,
 aspect = 1.8,
 isFlipped = false,
}: Props) {
 const fallback =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
   `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='9'><rect width='100%' height='100%' fill='#ffffff'/></svg>`
  );

 const frontTex = useLoader(THREE.TextureLoader, frontImageUrl || fallback);
 const backTex = useLoader(THREE.TextureLoader, backImageUrl || fallback);

 frontTex.needsUpdate = true;
 backTex.needsUpdate = true;

 const planeWidth = 1.8;
 const planeHeight = planeWidth / aspect;
 const frontRef = useRef<THREE.Mesh>(null);
 const backRef = useRef<THREE.Mesh>(null);

 useFrame(() => {
  const target = isFlipped ? Math.PI : 0;
  // rotate both meshes around same center (front faces +Z, back face rotated 180)
  if (frontRef.current && backRef.current) {
   frontRef.current.rotation.y += (target - frontRef.current.rotation.y) * 0.08;
   backRef.current.rotation.y += (target - backRef.current.rotation.y) * 0.08;
  }
 });

 return (
  <>
   {/* Front plane */}
   <mesh ref={frontRef} position={[0, 0, 0.001]}>
    <planeGeometry args={[planeWidth, planeHeight]} />
    <meshStandardMaterial map={frontTex} side={THREE.DoubleSide} />
   </mesh>

   {/* Back plane (rotated 180deg so its front faces opposite side) */}
   <mesh ref={backRef} position={[0, 0, -0.001]} rotation={[0, Math.PI, 0]}>
    <planeGeometry args={[planeWidth, planeHeight]} />
    <meshStandardMaterial map={backTex} side={THREE.DoubleSide} />
   </mesh>

   {/* Optional small edge box for realism — omitted for simplicity */}
  </>
 );
}

export default function ThreeDPreview({
 frontImageUrl,
 backImageUrl,
 aspect = 1.8,
 isFlipped = false,
}: Props) {
 return (
  <div className="w-full h-full">
   <R3FCanvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[0, 3, 3]} intensity={0.8} />
    <CardPair
     frontImageUrl={frontImageUrl}
     backImageUrl={backImageUrl}
     aspect={aspect}
     isFlipped={isFlipped}
    />
    <OrbitControls enablePan={false} />
   </R3FCanvas>
  </div>
 );
}
