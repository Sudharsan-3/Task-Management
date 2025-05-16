import React, { useEffect, useState } from 'react';

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
    const response = 
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
