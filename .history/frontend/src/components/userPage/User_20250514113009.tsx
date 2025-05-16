import {useQuery} from "@tanstack/react-query"
import api from "../../api/axios"

const User = () => {
  const featchUser = async () =>{
    const res = await api.get("/api/Usertasks")
  }

  const data = () =>{
    const {data,isLoading,error} = useQuery({
      
    })
  }


  return (
    <div>
        <h1>Welcome user </h1>
      
    </div>
  )
}

export default User
