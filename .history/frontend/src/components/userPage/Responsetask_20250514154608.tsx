// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';

const Responsetask = () => {
    const location = useLocation();
  const data = location.state; 
  console.log(data.task.id,"from Responsetask")
  return (
    <div>
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga placeat delectus, voluptas perferendis, tempore et doloremque sed exercitationem, error esse quod nostrum est eum blanditiis odit itaque! Aliquid, fugiat quis.
        
      
    </div>
  )
}

export default Responsetask
