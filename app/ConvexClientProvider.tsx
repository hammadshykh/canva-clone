"use client";

import Provider from "@/providers";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Loader2 } from "lucide-react";
import { ReactNode, Suspense } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
 return (
  <Suspense
   fallback={
    <div className="flex items-center justify-center min-h-screen">
     <Loader2 className="animate-spin" />
    </div>
   }
  >
   <ConvexProvider client={convex}>
    <Provider>{children}</Provider>
   </ConvexProvider>
  </Suspense>
 );
}
