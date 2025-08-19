import React from "react";
import RecentDesigns from "../_components/RecentDesigns";
import Image from "next/image";

const ProjectsPage = () => {
 return (
  <div className="p-10 w-full bg-gray-50 min-h-screen">
   <div className="w-full h-[200px] rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
    <Image
     src={"/banner-home.png"}
     alt="banner"
     width={1800}
     height={300}
     className="w-full h-[200px] rounded-2xl object-cover"
    />
    <h2 className="absolute bottom-5 left-10 text-white text-3xl">Projects</h2>
   </div>
   <RecentDesigns />
  </div>
 );
};

export default ProjectsPage;
