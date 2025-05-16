import React from 'react'
import { useLocation } from 'react-router-dom';

const Edittasks = () => {
    const location = useLocation();
  const { task } = location.state;
  const {id} = task


  
  console.log(task)
  return (
    <div>
        <h1>hii</h1>
      
    </div>
  )
}

export default Edittasks
