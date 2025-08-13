"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const RecentDesigns = () => {
 const [designList, setDesignList] = useState([]);
 return (
  <div className="mt-7">
   <h2 className="font-bold text-2xl">Recent Designs</h2>
   {designList.length === 0 ? (
    <div className="flex flex-col gap-4 items-center mt-5">
     <Image src={"/edittool.png"} alt="edit" width={100} height={100} />
     <h2 className="text-center">
      {" "}
      You don't have any design created, Create New one!
     </h2>
     <Button>+ Create New</Button>
    </div>
   ) : null}
  </div>
 );
};

export default RecentDesigns;
