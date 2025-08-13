import {
 Folders,
 Home,
 LayoutDashboardIcon,
 WalletCardsIcon,
} from "lucide-react";

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
