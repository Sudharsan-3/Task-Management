// import React from 'react'
import { useLocation } from 'react-router-dom';

const Edittasks = () => {
    const location = useLocation();
  const { task } = location.state;
  return (
    <div>
        <h1>{task}</h1>
      
    </div>
  )
}

export default Edittasks
