import React, { useState } from 'react'
import Getallusers from '../Getallusers';

const GecCreate = () => {
  const [user,setUser] = useState(false);
  const submitHandel = ()=>{
    
  }
  return (
    <div>
      <button onClick={GecCreate}>Create user</button>
      {
        user?<Getallusers /> : <Create
      }
      
    </div>
  )
}

export default GecCreate
