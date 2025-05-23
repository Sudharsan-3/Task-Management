import React, { useState } from 'react'
import Getallusers from '../Getallusers';
import Createuser from './Createuser';

const GecCreate = () => {
  const [user,setUser] = useState(false);
  const submitHandel = ()=>{
    
  }
  return (
    <div>
      <button onClick={GecCreate}>Create user</button>
      {
        user?<Getallusers /> : <Createuser />
      }
      
    </div>
  )
}

export default GecCreate
