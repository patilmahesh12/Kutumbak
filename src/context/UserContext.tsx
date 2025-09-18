"use client";
import { Family } from "@/types/family";
import { createContext, useState, useContext, ReactNode, Context } from "react";

type UserType = "FamilyHead" | "FamilyMember" | null;

interface UserContextProps {
  family: Family | null;
  setUser: (family: Family | null) => void;
}

const UserContext: Context<UserContextProps | undefined> = createContext<
  UserContextProps | undefined
>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [family, setFamily] = useState<Family | null>(null);

  const handleSetUser = (userFamily: Family | null) => {
    setFamily(userFamily);
  };

  return (
    <UserContext.Provider value={{ family, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  console.log("useUser");
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
