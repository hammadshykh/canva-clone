"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CreateCanvasDialog } from "./CreateCanvasDialog";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserDetailContext } from "@/context/userDetailsContext";
import { useRouter } from "next/navigation";

// types/designs.ts
export interface Design {
 _id: string;
 _creationTime: number;
 name: string;
 width: number;
 height: number;
 jsonTemplate?: any; // Optional - matches v.optional(v.any())
 imagePreview?: any; // Optional - matches v.optional(v.any())
 uid: string; // ID reference to users table
}

const RecentDesigns = () => {
 const [designList, setDesignList] = useState<Design[]>([]);
 const { userDetails } = useContext(UserDetailContext);
 const convex = useConvex();
 const router = useRouter();

 useEffect(() => {
  userDetails?.email && GetRecentDesigns();
 }, [userDetails]);

 const GetRecentDesigns = async () => {
  const result = await convex.query(api.designs.GetUserDesigns, {
   id: userDetails?._id,
  });
  console.log(result, "DESIGN LIST");
  setDesignList(result as any);
 };

 return (
  <div className="mt-7">
   <h2 className="font-bold text-2xl">Recent Designs</h2>
   {designList?.length === 0 ? (
    <div className="flex flex-col gap-4 items-center mt-5">
     <Image src={"/edittool.png"} alt="edit" width={100} height={100} />
     <h2 className="text-center">
      You don't have any design created, Create New one!
     </h2>
     <CreateCanvasDialog>
      <Button>+ Create New</Button>
     </CreateCanvasDialog>
    </div>
   ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
     {designList.map((design, index) => (
      <div
       key={index}
       className="bg-secondary rounded-lg"
       onClick={() => router.push(`/design/${design?._id}`)}
      >
       <Image
        src={design?.imagePreview}
        alt={design?.name}
        width={300}
        height={300}
        className="w-full h-[200px] cursor-pointer object-contain rounded-lg"
       />
      </div>
     ))}
    </div>
   )}
  </div>
 );
};

export default RecentDesigns;
