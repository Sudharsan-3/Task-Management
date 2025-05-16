import React from 'react'

const Userdashboard = () => {
    const userData = JSON.parse( localStorage.getItem("user"))

  return (
    <div>
        {userData.length>0 ?( <div>
            <h1>Name :<p></p>
        </h1>
        <h2>
            Email : <p></p>

        </h2>
        <h3>Role :<p>


        </p> </h3>
        </div>)

        }
       

        
        
      
    </div>
  )
}

export default Userdashboard
