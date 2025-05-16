import {React,createContext, useState} from "react" ;

const userData = createContext();

const userDataContext  = ({children:string})=>{
    const [userValue,setUservalue] = useState(null);


    return <userData.Provider value={} >
        {children}
    </userData.Provider>
    



}