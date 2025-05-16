import {React,createContext, useState} from "react" ;




const UserData = createContext();

const userDataContext  = ({children})=>{
    const [userValue,setUservalue] = useState(null);

    const valueHandel = ({data})=>{
        setUservalue(data)
    }


    return <userData.Provider value={{userValue,valueHandel}} >
        {children}
    </userData.Provider>


}


export {userDataContext , UserData}