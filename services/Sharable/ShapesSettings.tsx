import React from "react";
import { shapesSettingsList } from "../Options";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "@/components/ui/popover";

const ShapesSettings = () => {
 return (
  <div className="flex items-center gap-6">
   {shapesSettingsList.map((shape, index) => (
    <div key={index} className="hover:scale-105 transition-all cursor-pointer">
     <Popover>
      <PopoverTrigger asChild>
       <shape.icon />
      </PopoverTrigger>
      <PopoverContent>{shape?.component}</PopoverContent>
     </Popover>
    </div>
   ))}
  </div>
 );
};

export default ShapesSettings;
