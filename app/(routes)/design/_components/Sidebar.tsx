"use client";
import { sideBarMenu } from "@/services/Options";
import React, { useState } from "react";

const Sidebar = () => {
 const [selectedOption, setSelectedOption] = useState<string>(
  sideBarMenu[0].name
 );

 return (
  <div className="p-2 w-[120px] border-r min-h-screen">
   {sideBarMenu.map((menu, index) => (
    <div
     key={index}
     className={`p-2 mb-2 flex flex-col items-center hover:bg-secondary cursor-pointer rounded-md ${
      menu.name === selectedOption ? "bg-secondary" : ""
     }`}
     onClick={() => setSelectedOption(menu.name)}
    >
     <menu.icon className="w-5 h-5" />
     <h2 className="mt-1 text-sm">{menu.name}</h2>
    </div>
   ))}
  </div>
 );
};

export default Sidebar;
