import React from 'react'

const Userdashboard = () => {
    const userData = JSON.parse( localStorage.getItem("user"))

  return (
    <div>

        <h1>Name :   <p></p>
        </h1>
        <h2>
            Email : <p></p>

        </h2>
        <h3></h3>
        <p>


        </p>
      
    </div>
  )
}

export default Userdashboard
