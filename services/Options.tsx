import {
 Folders,
 Home,
 Image,
 LayoutDashboardIcon,
 LayoutTemplate,
 Settings,
 Sparkle,
 Type,
 WalletCardsIcon,
} from "lucide-react";

interface MenuItem {
 name: string;
 icon: React.ComponentType<{ className?: string }>; // Proper type for Lucide icons
 desc?: string;
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
  icon: Image,
  desc: "Select Shapes and Stickers",
 },
 { name: "Text", icon: Type, desc: "Add Text and Heading" },
 { name: "AI", icon: Sparkle, desc: "More AI Features to enhance your design" },
 {
  name: "Settings",
  icon: Settings,
  desc: "Update Canvas Size and background",
 },
];
