import React, { useContext, useState } from 'react'
import { AuthContext } from './Context/AuthContext'

const Navigation = () => {

    const {user} = useContext(AuthContext)
    console.log(user)

  return (
    <div>
      
    </div>
  )
}

export default Navigation
