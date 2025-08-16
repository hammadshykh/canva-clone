"use client";
import { sideBarMenu } from "@/services/Options";
import React, { useState } from "react";
import SidebarSettings from "./sidebarSettings";

const Sidebar = () => {
 const [selectedOption, setSelectedOption] = useState<any>(sideBarMenu[1]);

 return (
  <div className="flex">
   <div className="p-2 w-[120px] border-r min-h-screen">
    {sideBarMenu.map((menu, index) => (
     <div
      key={index}
      className={`p-2 mb-2 flex flex-col items-center hover:bg-secondary cursor-pointer rounded-md ${
       menu.name === selectedOption.name ? "bg-secondary" : ""
      }`}
      onClick={() => setSelectedOption(menu)}
     >
      <menu.icon className="w-5 h-5" />
      <h2 className="mt-1 text-sm">{menu.name}</h2>
     </div>
    ))}
   </div>
   <SidebarSettings selectedOption={selectedOption} />
  </div>
 );
};

export default Sidebar;
