import { useLocation } from 'react-router-dom'

const Readdetails = () => {
    const location = useLocation();
    const state = location.state;
  return (
    <div>

      <h1>View task page</h1>
          
    <h4>Token :</h4>
    <p>TICK-DATE(120525)-001
    </p>

    <h4>User Name :</h4>
    <p>{state?.task.task_name}</p>
    <h4>Task Discription :</h4>
    <p>{state?.task.tas}</p>
    <h4>Priority</h4>
    <p>Easy</p>    
    <h4>Status</h4>
    <p>Pending</p>
        
    <h4>Note :</h4>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro cumque ad sit quas expedita sunt, exercitationem obcaecati maiores illo excepturi eos nam temporibus blanditiis accusamus tempora odio repellendus? Quibusdam, dicta!</p>    
    <h4>Eta :</h4>
    <p>12/05/2025/11:55 am</p>
    </div>
  )
}

export default Readdetails
