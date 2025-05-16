import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

// interface User {
//   no: number;
//   taskName: string;
//   Description: string;
//   Priority: string;
//   Status : string;
// }

const Loadtasks = () => {
  const [lData,setLdata] = useState();

  useEffect(()=>{
    const featch = async()=>{
            try {
              const response = await api.get("/api/task")
              console.log(response)
              setLdata(response.data)
              
            } catch (error) {
              
            }

    }
    featch();
  },[])

  return (
    <div>
      <table>
        <thead>
           <tr>
          <th>S.no</th>
        <th>Task Name</th>
        <th>Task Description</th>
        <th>Priority</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
       
        
      </table>

      
    </div>
  )
}

export default Loadtasks
