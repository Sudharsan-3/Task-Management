import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Loadtasks = () => {
  const [lData,setLdata] = useState();

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
