import React from 'react'

const Admin = () => {
  return (
    <div >
        <h1> Wlecome to admin page</h1>
       <div className="flex justify-around p-3-2-3-2 flex-wrap mt-5 ">
        <button className="p-4 h-19 w-45 " >Tasks</button>
        <button className="p-4 h-19 w-45 " >Create Tasks</button>
        <button className="p-4 h-19 w-45 " >Users</button>
        <button className="p-4 h-19 w-45 " >Draft</button>
        <button className="p-4 h-19 w-45 " >Completed</button>
       </div>
      
    </div>
  )
}

export default Admin
