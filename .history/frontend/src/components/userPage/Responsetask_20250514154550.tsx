// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';

const Responsetask = () => {
    const location = useLocation();
  const data = location.state; 
  console.log(data.task.id,"from Responsetask")
  return (
    <div>
       hi
        
      
    </div>
  )
}

export default Responsetask
