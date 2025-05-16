import {React,createContext, useState} from "react" ;




const userData = createContext();

const userDataContext  = ({children})=>{
    const [userValue,setUservalue] = useState(null);

    const valueHandel = ({data})=>{
        
    }


    return <userData.Provider value={{userValue,valueHandel}} >
        {children}
    </userData.Provider>
    



}