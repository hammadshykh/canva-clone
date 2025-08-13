import { createContext } from "react";

interface UserDetails {
 id?: string;
 name: string | null | undefined;
 email: string | null | undefined;
 picture: string | null | undefined;
}

interface UserDetailContextType {
 userDetails: UserDetails | null;
 setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}

// Provide a default value matching the context type
export const UserDetailContext = createContext<UserDetailContextType>({
 userDetails: null,
 setUserDetails: () => {
  console.warn("No UserDetailProvider found");
 },
});
