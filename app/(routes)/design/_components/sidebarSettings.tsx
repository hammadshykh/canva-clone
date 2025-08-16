import React from "react";

const SidebarSettings = ({ selectedOption }: { selectedOption: any }) => {
 console.log(selectedOption, "SELECTED-OPTION");
 return (
  <div className="w-[280px] p-5 h-screen border-r">
   <h2 className="font-bold text-black">{selectedOption?.name}</h2>
   <p className="text-sm text-gray-500 mb-5">{selectedOption?.desc}</p>
   {selectedOption?.component}
  </div>
 );
};

export default SidebarSettings;
