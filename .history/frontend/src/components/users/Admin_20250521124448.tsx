// import  { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../Context/AuthContext'
// import { useQuery } from '@tanstack/react-query';
// import api from '../../api/axios';
// import { toast,ToastContainer } from 'react-toastify';


// const Admin = () => {
//   const user = useContext(AuthContext);
//   const [value,setValue] = useState()
//   const id = user.user?.id

//   const featchData = async()=>{
//     const res = await api.post("/api/Admin",{id});
//     return res.data;
//   }
//   const {data,isLoading,isSuccess,isError} = useQuery({
//     queryKey : ['user id' , id],
//     queryFn: featchData,
//     refetchOnMount: true,
//     refetchOnWindowFocus: false,
//   })
// useEffect(() => {
//     if (isLoading) {
//       toast.loading('Fetching tasks...', { toastId: 'fetching' });
//     }
//     if (isSuccess) {
      
//       toast.dismiss('fetching');
//       toast.success('Users loaded successfully!');
     
     
//     }
//     if (isError) {
//       console.log(isError)
//       toast.dismiss('fetching');
//       toast.error('Failed to fetch users!');
//     }
//   }, [isLoading, isSuccess, isError]);
  
//   console.log(JSON.stringify(data))
//   console.log(user.user)
//   return (
//     <div>
//       <ToastContainer position='top-right' autoClose={3000} />
//       <h1>Welcom {user.user?.name} </h1>
//      {/* {data.users.map((e:string|number,index:number)=>{
//       <li key={index}>
//         <h1>{e}</h1>
//       </li>
//      }) } */}

      
//     </div>
//   )
// }

// export default Admin

