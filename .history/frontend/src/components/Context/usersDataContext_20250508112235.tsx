import {React,createContext, useState} from "react" ;




const userData = createContext();

const userDataContext  = ({children})=>{
    const [userValue,setUservalue] = useState(null);


    return <userData.Provider value={{userValue}} >
        {children}
    </userData.Provider>
    



}