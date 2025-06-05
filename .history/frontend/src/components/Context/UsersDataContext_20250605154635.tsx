import React, { createContext, useState, ReactNode } from "react";

// 1. Define context value type
interface UserContextType {
  userValue: string|number | null;
  handelData: (data: number) => void;
}

// 2. Create context with initial undefined and proper typing
const UserData = createContext<UserContextType | undefined>(undefined);



// 3. Define props type for the provider component
interface UserDataProviderProps {
  children: ReactNode;
}



// 4. Context Provider component
const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [userValue, setUserValue] = useState<number | null>(0);

  const handelData = (data: number) => {
    setUserValue(data);
  };

  return (
    <UserData.Provider value={{ userValue, handelData }}>
      {children}
    </UserData.Provider>
  );
};

export { UserDataProvider, UserData };

