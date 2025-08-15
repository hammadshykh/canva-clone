import { UserDetailContext } from "@/context/userDetailsContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { useContext } from "react";

const IntroOptions = () => {
 const createDesignRecord = useMutation(api.designs.CreateNewDesign);
 const { userDetails } = useContext(UserDetailContext);

 /**
  * Used to create new design and Save to DB
  * @param {*} option
  */

 const OnCanvasOptionSelect = async (option: any) => {
  const result = await createDesignRecord({
   name: option.name,
   width: option.width,
   height: option.height,
   uid: userDetails?._id || "",
  });
  // Navigate to Editor Screen
 };
 return (
  <div className="w-full  h-[200px] rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
   <Image
    src={"/banner-home.png"}
    alt="banner"
    width={1800}
    height={300}
    className="w-full h-[200px] rounded-2xl object-cover"
   />
   <h2 className="absolute bottom-5 left-10 text-white text-3xl">Workspace</h2>
  </div>
 );
};

export default IntroOptions;
