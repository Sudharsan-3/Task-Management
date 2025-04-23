
export const taskController = async(req,res)=>{
    const result = await db.query("SELECT * FROM tasks")
    if(result.rows.length > 0){
        res.send(result.rows)
    }else{
        res.send("No data")
    }
}




