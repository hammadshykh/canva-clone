import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

const WorkSpaceHeader = () => {
 return (
  <div className="p-2 px-5 flex items-center justify-between shadow-sm border-b">
   <Image
    src={"/logo.png"}
    alt="logo"
    width={100}
    height={100}
    className="w-[100px] h-[40px]"
   />
   <UserButton />
  </div>
 );
};

export default WorkSpaceHeader;
