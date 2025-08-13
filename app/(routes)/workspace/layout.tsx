import type { ReactNode } from "react";
import WorkSpaceHeader from "./_components/Header";
import Sidebar from "./_components/Sidebar";

const WorkSpacelayout = ({ children }: { children: ReactNode }) => {
 return (
  <div className="min-h-screen bg-gray-50">
   <WorkSpaceHeader />
   <div className="flex">
    <Sidebar />
    <main className="flex-1">{children}</main>
   </div>
  </div>
 );
};

export default WorkSpacelayout;
