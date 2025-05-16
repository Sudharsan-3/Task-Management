// hooks/useUserData.ts
import { useContext } from "react";
import { UserData } from "../Context/usersDataContext"; // adjust path
import type { UserDataProvider } from "../Context/usersDataContext"; // adjust path

export const useUserData = (): UserDataProvider => {
  const context = useContext(UserData);

  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
};
