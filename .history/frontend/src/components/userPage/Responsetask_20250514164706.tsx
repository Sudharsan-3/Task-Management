import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';
import api from '../../api/axios';

const Responsetask = () => {
    const location = useLocation();
  const data = location.state; 

  const fetchData = async()=>{
        const res = await api.patch("api/Usergettask",{id:data});
        return res
  }

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fe,
  });

  console.log(data,"from Responsetask")
  return (
    <div>
        <h1>hi</h1>
        
      
    </div>
  )
}

export default Responsetask
