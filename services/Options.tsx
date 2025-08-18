import {
 Blend,
 Component,
 Folders,
 Home,
 Image,
 LayoutDashboardIcon,
 LayoutTemplate,
 Minus,
 Palette,
 Settings,
 ShapesIcon,
 Sparkle,
 Square,
 SquareRoundCorner,
 Type,
 WalletCardsIcon,
} from "lucide-react";
import BackgroundSetting from "./Components/BackgroundSetting";
import AddImageSetting from "./Components/AddImageSetting";
import Elements from "./Components/Elements";
import FillColor from "./Sharable/FillColor";
import BorderColor from "./Sharable/BorderColor";
import BorderWidth from "./Sharable/BorderWidth";
import OpacitySlider from "./Sharable/OpacitySlider";
import BorderRadius from "./Sharable/BorderRadius";
import AITransformSetting from "./Components/AITransformSetting";
import TextSetting from "./Components/TextSetting";

interface MenuItem {
 name: string;
 icon: React.ComponentType<{ className?: string }>; // Proper type for Lucide icons
 desc?: string;
 component?: any;
}

export const WorkSpaceMenu = [
 {
  name: "Home",
  icon: Home,
  path: "/workspace",
 },
 {
  name: "Projects",
  icon: Folders,
  path: "/workspace/projects",
 },
 {
  name: "Templates",
  icon: LayoutDashboardIcon,
  path: "/workspace/templates",
 },
 {
  name: "Billing",
  icon: WalletCardsIcon,
  path: "/workspace/billing",
 },
];

export const sideBarMenu: MenuItem[] = [
 {
  name: "Templates",
  icon: LayoutTemplate,
  desc: "Select Prebuild Template",
 },
 {
  name: "Elements",
  icon: ShapesIcon,
  desc: "Select Shapes and Stickers",
  component: <Elements />,
 },
 {
  name: "Images",
  icon: Image,
  desc: "Add Image or upload your image",
  component: <AddImageSetting />,
 },
 {
  name: "Text",
  icon: Type,
  desc: "Add Text and Heading",
  component: <TextSetting />,
 },
 {
  name: "AI",
  icon: Sparkle,
  desc: "More AI Features to enhance your design",
  component: <AITransformSetting />,
 },
 {
  name: "Background",
  icon: Component,
  desc: "Change Canvas Background",
  component: <BackgroundSetting />,
 },
 {
  name: "Settings",
  icon: Settings,
  desc: "Update Canvas Size and background",
 },
];

export const CanvasOptionSelect = [
 {
  name: "Instagram Post",
  icon: "/instagram.png",
  bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
  width: 1200,
  height: 800,
 },
 {
  name: "Instagram Story",
  icon: "/instagram.png",
  bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
  width: 300,
  height: 600,
 },
 { name: "YouTube Thumbnail", icon: "/youtube.png", bgColor: "bg-red-500" },
 {
  name: "YouTube Banner",
  icon: "/youtube.png",
  bgColor: "bg-red-600",
  width: 1400,
  height: 1000,
 },
 {
  name: "YouTube Post",
  icon: "/youtube.png",
  bgColor: "bg-red-500",
  width: 1200,
  height: 800,
 },
 {
  name: "PowerPoint Slide",
  icon: "/ppt.png",
  bgColor: "bg-orange-500",
  width: 500,
  height: 400,
 },
 {
  name: "Flyer (A4)",
  icon: "/banner.png",
  bgColor: "bg-green-500",
  width: 500,
  height: 400,
 },
 {
  name: "Facebook Post",
  icon: "/facebook.png",
  bgColor: "bg-blue-600",
  width: 1200,
  height: 800,
 },
 {
  name: "Twitter Post",
  icon: "/twitter.png",
  bgColor: "bg-sky-500",
  width: 1200,
  height: 800,
 },
 {
  name: "LinkedIn Post",
  icon: "/linkedin.png",
  bgColor: "bg-blue-700",
  width: 1200,
  height: 800,
 },
 {
  name: "Pinterest Pin",
  icon: "/pinterest.png",
  bgColor: "bg-red-600",
  width: 500,
  height: 400,
 },
];

export const shapeList = [
 {
  name: "Circle",
  icon: "/moon.png",
 },
 {
  name: "Square",
  icon: "/square.png",
 },
 {
  name: "Trangle",
  icon: "/trangle.png",
 },
 {
  name: "Line",
  icon: "/line.png",
 },
];

export const shapesSettingsList = [
 {
  name: "Fill",
  icon: Palette,
  component: <FillColor />,
 },
 {
  name: "Stroke Color",
  icon: Square,
  component: <BorderColor />,
 },
 {
  name: "Stroke Width",
  icon: Minus,
  component: <BorderWidth />,
 },
 {
  name: "Opacity",
  icon: Blend,
  component: <OpacitySlider />,
 },
 {
  name: "Rounded Corner",
  icon: SquareRoundCorner,
  component: <BorderRadius />,
 },
 //  {
 //   name: "Delete",
 //   icon: Trash,
 //  },
];

export const AITransformationSettings = [
 {
  name: "Background Remove",
  command: "e-bgremove",
  image: "/remove-bg.jpg",
 },
 {
  name: "Change Background",
  command: "e-changebg-prompt-",
  image: "/change-bg.jpg",
  input: true,
 },
 {
  name: "Generative fill",
  command: "bg-genfill,w-1000,h-960,cm-pad_resize",
  image: "/generative-fill.png",
 },
 {
  name: "AI drop shadow",
  command: "e-dropshadow",
  image: "/shadow.jpeg",
 },
 {
  name: "Upscale",
  command: "e-upscale",
  image: "/upscale.png",
 },
 {
  name: "Smart crop",
  command: "fo-auto",
  image: "/smartcrop.png",
 },
 {
  name: "Contrast",
  command: "e-grayscale",
  image: "/grayscale.png",
 },
 {
  name: "Blur",
  command: "e-blur",
  image: "/e-blur.png",
 },
 {
  name: "Flip",
  command: "e-flip",
  image: "/e-flip.png",
 },
];
