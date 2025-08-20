"use client";
import { UserDetailContext } from "@/context/userDetailsContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CanvasOptionSelect } from "@/services/Options";
import { toast } from "sonner";

const IntroOptions = () => {
 const createDesignRecord = useMutation(api.designs.CreateNewDesign);
 const { userDetails } = useContext(UserDetailContext);
 const router = useRouter();
 const [loadingId, setLoadingId] = useState<string | null>(null);

 const OnCanvasOptionSelect = async (option: any) => {
  if (!option?.width || !option?.height) {
   toast.error("Missing dimensions for this template");
   return;
  }

  if (!userDetails?._id) {
   toast.error("Please sign in to create designs");
   return;
  }

  setLoadingId(option.name);
  const toastId = toast.loading(`Creating ${option.name}...`);

  try {
   const result = await createDesignRecord({
    name: option.name,
    width: option.width,
    height: option.height,
    uid: userDetails._id,
   });

   toast.success("Design created successfully!", { id: toastId });
   router.push("/design/" + result);
  } catch (error) {
   console.error("Error creating design:", error);
   toast.error("Failed to create design", { id: toastId });
  } finally {
   setLoadingId(null);
  }
 };

 return (
  <>
   <div className="w-full h-[200px] rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
    <Image
     src={"/banner-home.png"}
     alt="banner"
     width={1800}
     height={300}
     className="w-full h-[200px] rounded-2xl object-cover"
    />
    <h2 className="absolute bottom-5 left-10 text-white text-3xl">Workspace</h2>
   </div>
   <div className="mb-12">
    <div className="flex items-center justify-center gap-6 mt-10">
     {CanvasOptionSelect.map((option, index) => (
      <div
       key={index}
       onClick={() => OnCanvasOptionSelect(option)}
       className="flex flex-col items-center rounded-lg cursor-pointer group hover:scale-105 transition-transform"
       //  disabled={loadingId === option.name}
      >
       <Image
        src={option.icon}
        alt={option.name}
        width={60}
        height={60}
        className={`hover:scale-110 transition-all ${
         loadingId === option.name ? "opacity-50" : ""
        }`}
       />
       <h2 className="text-xs mt-2">
        {loadingId === option.name ? "Creating..." : option.name}
       </h2>
      </div>
     ))}
    </div>
   </div>
  </>
 );
};

export default IntroOptions;
