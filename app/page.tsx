"use client";
import { useUser } from "@stackframe/stack";
import { redirect } from "next/navigation";

export default function Home() {
 const user = useUser();
 if (user?.primaryEmail) {
  redirect("/workspace");
 }

 redirect("/handler/sign-in");
}
