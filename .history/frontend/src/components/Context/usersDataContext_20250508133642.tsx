import React, { createContext, useState, ReactNode } from "react";

// 1. Define context value type
interface UserContextType {
  userValue: string | null;
  handelData: (data: string) => void;
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

  const handelData = (data: string) => {
    setUserValue(data);
  };

  return (
    <UserData.Provider value={{ userValue, handelData }}>
      {children}
    </UserData.Provider>
  );
};

export { UserDataProvider, UserData };

// import {React,createContext, useState} from "react" ;




// const UserData = createContext();

// const userDataContext  = ({children})=>{
//     const [userValue,setUservalue] = useState(null);

//     const valueHandel = ({data}:{data:string})=>{
//         setUservalue(data)
//     }


//     return <UserData.Provider value={{userValue,valueHandel}} >
//         {children}
//     </UserData.Provider>


// }


// export {userDataContext , UserData}