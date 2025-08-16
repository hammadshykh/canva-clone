"use client";
import { UserDetailContext } from "@/context/userDetailsContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { CanvasOptionSelect } from "@/services/Options";

const IntroOptions = () => {
 const createDesignRecord = useMutation(api.designs.CreateNewDesign);
 const { userDetails } = useContext(UserDetailContext);
 const router = useRouter();

 const OnCanvasOptionSelect = async (option: any) => {
  console.log(option, "Before create design");
  if (!option?.width || !option?.height) {
   console.error("Missing required dimensions for design");
   return;
  }

  try {
   const result = await createDesignRecord({
    name: option.name,
    width: option.width,
    height: option.height,
    uid: userDetails?._id || "",
   });

   console.log(result, "INTRO OPTION");
   router.push("/design/" + result);
  } catch (error) {
   console.error("Error creating design:", error);
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
       className="flex flex-col items-center rounded-lg cursor-pointer group"
      >
       <Image
        src={option.icon}
        alt={option.name}
        width={60}
        height={60}
        className="hover:scale-105 transition-all"
       />
       <h2 className="text-xs mt-2">{option.name}</h2>
      </div>
     ))}
    </div>
   </div>
  </>
 );
};

export default IntroOptions;
