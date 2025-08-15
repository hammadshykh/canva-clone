import { Input } from "@/components/ui/input";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

const DesignHeader = ({ designInfo }: { designInfo: any }) => {
 console.log(designInfo);
 return (
  <div className="flex justify-between p-3 bg-gradient-to-r from-sky-500 via-blue-400">
   <Image
    src={"/logo-white.png"}
    alt="logo"
    width={100}
    height={100}
    className="w-[100px] h-[40px]"
   />
   <div>
    <Input
     placeholder="Design Name"
     value={designInfo?.name}
     className="border-0 text-white"
    />
   </div>
   <UserButton />
  </div>
 );
};

export default DesignHeader;
