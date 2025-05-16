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
        return res.data
  }

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["userTasks", id],
    queryFn: fetchData,
  });
  const data

  console.log(JSON.stringify(data),"from Responsetask")
  return (
    <div>
        <ToastContainer position='top-right' autoClose={3000} />
        <h1>hi</h1>
        
      
    </div>
  )
}

export default Responsetask
