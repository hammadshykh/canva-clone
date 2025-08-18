import React, { useState } from "react";
import { AITransformationSettings } from "../Options";
import Image from "next/image";
import CustomImageUpload from "../Sharable/CustomImageUpload";

const AITransformSetting = () => {
 const [selectedAi, setSelectedAi] = useState();
 return (
  <div>
   <CustomImageUpload selectedAi={selectedAi} />
   <h2 className="my-2 font-bold text-sm text-center">
    AI Transformation By ImageKit.io
   </h2>
   <div className="grid grid-cols-2 gap-2">
    {AITransformationSettings.map((option, index) => (
     <div
      key={index}
      className="cursor-pointer"
      onClick={() => setSelectedAi(option as any)}
     >
      <Image
       src={option.image}
       alt={option.name}
       width={500}
       height={500}
       className="object-cover w-full h-[70px] rounded-md"
      />
      <h2 className="text-sm text-center mt-1">{option.name}</h2>
     </div>
    ))}
   </div>
  </div>
 );
};

export default AITransformSetting;
