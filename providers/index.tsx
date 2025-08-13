"use client";
import { UserDetailContext } from "@/context/userDetailsContext";
import { api } from "@/convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { ReactNode, useEffect, useState } from "react";

interface UserDetails {
 id?: string;
 name: string | null | undefined;
 email: string | null | undefined;
 picture: string | null | undefined;
}

const Provider = ({ children }: { children: ReactNode }) => {
 const user = useUser();
 const createNewUserMutation = useMutation(api.users.CreateNewUser);
 const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

 useEffect(() => {
  if (user) {
   createUser();
  }
 }, [user]);

 const createUser = async () => {
  const data: UserDetails = {
   name: user?.displayName,
   email: user?.primaryEmail,
   picture: user?.profileImageUrl,
  };

  try {
   const result = await createNewUserMutation(data as any);
   setUserDetails({
    ...data,
   });
   console.log(result, "RESULT CREATE USER");
  } catch (error) {
   console.error("Error creating user:", error);
  }
 };

 return (
  <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
   {children}
  </UserDetailContext.Provider>
 );
};

export default Provider;
