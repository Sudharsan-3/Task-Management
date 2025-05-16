import React from 'react'

const Userdashboard = () => {
    const userData = JSON.parse( localStorage.getItem("user"))

  return (
    <div>

        <h1>Name :   <p></p>
        </h1>
        <h2>
            Email : 

        </h2>
        <p>

        </p>
      
    </div>
  )
}

export default Userdashboard
