import { useCanvas } from "@/context/CanvasEditorContext";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

type Template = {};

const TemplateList = () => {
 const { canvasEditor } = useCanvas();
 const templatelist = useQuery(api.templates.GetAllTemplates);
 console.log(templatelist);

 const onTemplateSelect = (template: any) => {
  if (canvasEditor) {
   canvasEditor?.loadFromJSON(template?.jsonData, () => {
    canvasEditor?.requestRenderAll();
   });
  }
 };
 return (
  <div>
   <div className="grid grid-cols-2 gap-4">
    {templatelist?.map((template, index) => (
     <div key={index} onClick={() => onTemplateSelect(template)}>
      <Image
       src={template?.imagePreview || ""}
       alt={template.name}
       width={500}
       height={500}
       className="w-full h-[150px] rounded-lg bg-contain bg-secondary"
      />
     </div>
    ))}
   </div>
  </div>
 );
};

export default TemplateList;
