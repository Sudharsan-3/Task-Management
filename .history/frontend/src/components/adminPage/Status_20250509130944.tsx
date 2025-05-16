import React from 'react'

const Status = () => {
    const clickHandel = (e:string)=>{
        console.log(e.target.value)
    }
  return (
    <div>
        <button onClick={clickHandel} value="Draft">Draft</button>
        <button onClick={clickHandel} value="Completeded">Completeded</button>
      
    </div>
  )
}

export default Status
