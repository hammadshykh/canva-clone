import Image from "next/image";

const templates = [
 {
  name: "Instagram Post",
  icon: "/instagram.png",
  bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
 },
 {
  name: "Instagram Story",
  icon: "/instagram.png",
  bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
 },
 { name: "YouTube Thumbnail", icon: "/youtube.png", bgColor: "bg-red-500" },
 {
  name: "YouTube Banner",
  icon: "/youtube.png",
  bgColor: "bg-red-600",
 },
 { name: "YouTube Post", icon: "/youtube.png", bgColor: "bg-red-500" },
 {
  name: "PowerPoint Slide",
  icon: "/ppt.png",
  bgColor: "bg-orange-500",
 },
 { name: "Flyer (A4)", icon: "/banner.png", bgColor: "bg-green-500" },
 { name: "Facebook Post", icon: "/facebook.png", bgColor: "bg-blue-600" },
 { name: "Twitter Post", icon: "/twitter.png", bgColor: "bg-sky-500" },
 { name: "LinkedIn Post", icon: "/linkedin.png", bgColor: "bg-blue-700" },
 { name: "Pinterest Pin", icon: "/pinterest.png", bgColor: "bg-red-600" },
];

const TemplateGrid = () => {
 return (
  <div className="mb-12">
   <div className="flex items-center justify-center gap-6 mt-10">
    {templates.map((template, index) => (
     <div
      key={index}
      className="flex flex-col items-center  rounded-lg  cursor-pointer group"
     >
      <Image
       src={template.icon}
       alt={template.name}
       width={60}
       height={60}
       className="hover:scale-105 transition-all"
      />
      <h2 className="text-xs mt-2">{template.name}</h2>
     </div>
    ))}
   </div>
  </div>
 );
};

export default TemplateGrid;
