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
    <p>{state?.task.task_description}</p>
    <h4>Priority</h4>
    <p>{state?.task.priority}</p>    
    <h4>Status</h4>
    <p>{state?.task.status</p>
        
    <h4>Note :</h4>
    <p>{state?.task.user_comments:state?.task.user_comments}</p>    
    <h4>Eta :</h4>
    <p>12/05/2025/11:55 am</p>
    </div>
  )
}

export default Readdetails
