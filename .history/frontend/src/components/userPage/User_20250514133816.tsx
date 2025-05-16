import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

const User = () => {
  const id:string|any = localStorage.getItem("id")
  const fetchUser = async () => {

    const res = await api.get("/api/Usertasks",{
      params: {id}});
    console.log(res,"from users")
    return res;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userTasks"], // Add a unique queryKey here
    queryFn: fetchUser,
  });

  if (isLoading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Simple error message
  }

  return (
    <div>
      <h1>Welcome user</h1>
      {data && ( //check if data exists before accessing it.
        <div>
          {/* Display your user data here.  For example: */}
          <p>Data: {JSON.stringify(data.data)}</p>
          {/* Important:  Access data correctly.  axios wraps the response in a 'data' property.
               Replace this with how you want to display the *actual* user data. */}
        </div>
      )}
    </div>
  );
};

export default User;

// import {useQuery} from "@tanstack/react-query"
// import api from "../../api/axios"

// const User = () => {
//   const featchUser = async () =>{
//     const res = await api.get("/api/Usertasks");
//     return res
//   }

//   const data = () =>{
//     const {data,isLoading,error} = useQuery({queryFn:featchUser,})
//   }

// data()
//   return (
//     <div>
//         <h1>Welcome user </h1>
      
//     </div>
//   )
// }

// export default User
