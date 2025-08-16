"use client";
import { useUser } from "@stackframe/stack";
import IntroOptions from "./_components/IntroOptions";
import RecentDesigns from "./_components/RecentDesigns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const WorkSpacePage = () => {
 const user = useUser();

 if (!user?.primaryEmail) {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-4 p-6">
    <h1 className="text-2xl font-bold">
     Please sign in to access your workspace
    </h1>
    <div className="flex gap-4">
     <Button asChild>
      <Link href="/handler/sign-in">Sign In</Link>
     </Button>
     <Button variant="outline" asChild>
      <Link href="/handler/sign-up">Sign Up</Link>
     </Button>
    </div>
   </div>
  );
 }

 return (
  <div className="p-6 bg-gray-50 min-h-screen">
   <IntroOptions />
   <RecentDesigns />
  </div>
 );
};

export default WorkSpacePage;
