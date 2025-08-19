"use client";
import { UserDetailContext } from "@/context/userDetailsContext";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const PreTemplates = () => {
 const templatesList = useQuery(api.templates.GetAllTemplates);
 const { userDetails } = useContext(UserDetailContext);
 const router = useRouter();
 const createNewDesignTemplate = useMutation(
  api.designs.CreateDesignFormTemplate
 );
 const onTemplateSelect = async (template: any) => {
  // Save to design Table with Uid

  const id = await createNewDesignTemplate({
   ...template,
   uuid: userDetails?._id,
   height: template?.height,
   width: template?.width,
  });
  console.log(id);
  router.push(`/design/${id}`);
 };
 return (
  <div>
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
    {templatesList?.map((design, index) => (
     <div
      key={index}
      className="bg-secondary rounded-lg"
      onClick={() => onTemplateSelect(design)}
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
  </div>
 );
};

export default PreTemplates;
