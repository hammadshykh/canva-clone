"use client";
import { WorkSpaceMenu } from "@/services/Options";
import { CirclePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
 const pathName = usePathname();

 return (
  <div className="shadow-sm h-screen bg-purple-100">
   <div className="p-2 flex items-center flex-col mb-5 hover:cursor-pointer">
    <CirclePlus className="bg-purple-600 text-white rounded-full w-8 h-8" />
    <h2 className="text-sm text-purple-600">Create</h2>
   </div>
   {WorkSpaceMenu.map((menu) => (
    <div
     className={`flex p-2 items-center flex-col mb-4 group hover:bg-purple-100 rounded-xl cursor-pointer ${pathName == menu.path && "bg-purple-100"}`}
    >
     <menu.icon
      className={`group-hover:text-purple-800 ${pathName == menu.path && "bg-purple-100"}`}
     />
     <h2
      className={`text-sm group-hover:text-purple-800 ${pathName == menu.path && "bg-purple-100"}`}
     >
      {menu.name}
     </h2>
    </div>
   ))}
  </div>
 );
};

export default Sidebar;
