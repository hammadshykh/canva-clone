"use client";
import { WorkSpaceMenu } from "@/services/Options";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CreateCanvasDialog } from "./CreateCanvasDialog";

const Sidebar = () => {
 const pathName = usePathname();

 return (
  <div className="shadow-sm min-h-screen bg-purple-100">
   <CreateCanvasDialog>
    <div className="p-2 w-full h-f flex items-center flex-col mb-5 hover:cursor-pointer">
     <CirclePlus className="bg-purple-600 text-white rounded-full w-8 h-8" />
     <h2 className="text-sm text-purple-600">Create</h2>
    </div>
   </CreateCanvasDialog>
   {WorkSpaceMenu.map((menu) => (
    <Link
     key={menu.name}
     href={menu.path}
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
    </Link>
   ))}
  </div>
 );
};

export default Sidebar;
