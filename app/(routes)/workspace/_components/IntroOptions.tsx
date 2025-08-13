import Image from "next/image";
import React from "react";

const IntroOptions = () => {
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
