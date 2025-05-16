// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';

const Responsetask = () => {
    const location = useLocation();
  const data = location.state; 
  console.log(data.task.id)
  return (
    <div>
        <h1>{data}</h1>
        
      
    </div>
  )
}

export default Responsetask
