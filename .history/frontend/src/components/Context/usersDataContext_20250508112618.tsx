import {React,createContext, useState} from "react" ;




const UserData = createContext();

const userDataContext  = ({children})=>{
    const [userValue,setUservalue] = useState(null);

    const valueHandel = ({data:s})=>{
        setUservalue(data)
    }


    return <UserData.Provider value={{userValue,valueHandel}} >
        {children}
    </UserData.Provider>


}


export {userDataContext , UserData}