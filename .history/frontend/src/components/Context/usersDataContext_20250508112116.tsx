import {React,createContext, useState} from "react" ;

interface User {
    user: number;
    name: string;
    email: string;
    role: string;
  }


const userData = createContext();

const userDataContext  = ({children})=>{
    const [userValue,setUservalue] = useState(null);


    return <userData.Provider value={} >
        {children}
    </userData.Provider>
    



}