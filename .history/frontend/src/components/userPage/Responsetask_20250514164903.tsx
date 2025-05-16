import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom';
import api from '../../api/axios';
import { ToastContainer,toast } from 'react-toastify';

const Responsetask = () => {
    const location = useLocation();
  const id = location.state; 

  const fetchData = async()=>{
        const res = await api.patch("api/Usergettask",{id});
        return res
  }

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchData,
  });

  console.log(data,"from Responsetask")
  return (
    <div>
        <tos
        <h1>hi</h1>
        
      
    </div>
  )
}

export default Responsetask
