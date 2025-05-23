import React, { useState } from 'react'

const GecCreate = () => {
  const [user,setUser] = useState(false);
  const submitHandel = ()=>{
    
  }
  return (
    <div>
      <button onClick={GecCreate}>Create user</button>
      {
        user
      }
      
    </div>
  )
}

export default GecCreate
