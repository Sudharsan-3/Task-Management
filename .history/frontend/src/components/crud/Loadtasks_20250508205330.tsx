
// import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';

// // interface User {
// //   no: number;
// //   taskName: string;
// //   Description: string;
// //   Priority: string;
// //   Status : string;
// // }

// const Loadtasks = () => {
//   const [lData,setLdata] = useState({});

//   useEffect(()=>{
//     const featch = async()=>{
//             try {
//               const id  =localStorage.getItem("id")
//               const response = await api.post("/api/task",{
//                 id:id
//               })
//               const result = response.data
//               console.log(result,"data")
//               setLdata(result)
//               console.log(lData,"dataload")
//             } catch (error) {
//               console.log(error)
//             }

//     }
//     featch();
//   },[])

//   return (
//     <div>
//       <table>
//         <thead>
//            <tr>
//           <th>S.no</th>
//         <th>Task Name</th>
//         <th>Task Description</th>
//         <th>Priority</th>
//         <th>Status</th>
//         </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//           </tr>
//         </tbody>
       
        
//       </table>

      
//     </div>
//   )
// }

// export default Loadtasks
