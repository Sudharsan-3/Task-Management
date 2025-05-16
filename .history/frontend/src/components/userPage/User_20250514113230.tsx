import {useQuery} from "@tanstack/react-query"
import api from "../../api/axios"

const User = () => {
  const featchUser = async () =>{
     await api.get("/api/Usertasks")
     return
  }

  const data = () =>{
    const {data,isLoading,error} = useQuery({queryFn:featchUser,})
  }

data()
  return (
    <div>
        <h1>Welcome user </h1>
      
    </div>
  )
}

export default User
