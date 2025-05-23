import { useState } from 'react'
import Getallusers from '../Getallusers';
import Createuser from './Createuser';

const GecCreate = () => {
  const [user,setUser] = useState(false);
  const submitHandel = ()=>{
    setUser(true)
    
  }
  return (
    <div>
      {
        user
      }
      <button onClick={submitHandel}>Create user</button>
      {
        user?<Createuser /> : <Getallusers />
      }
      
    </div>
  )
}

export default GecCreate
