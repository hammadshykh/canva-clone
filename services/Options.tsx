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
 },
 {
  name: "Elements",
  icon: Image,
 },
 { name: "Text", icon: Type },
 { name: "AI", icon: Sparkle },
 { name: "Settings", icon: Settings },
];
