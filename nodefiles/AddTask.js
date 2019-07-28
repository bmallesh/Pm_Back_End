exp=require("express")
mj=require("mongojs")
// conn=mj("mongodb://localhost:27017/ProjectManager")
conn = mj("mongodb://pm1:pm1234@ds137827.mlab.com:37827/pm")

rout=exp.Router()
// ===============  Add Task  ================
rout.post('/addTask',function(req,res){
    dt=req.body;
    if(dt.parentTask==true){
        conn.parentTaskTable.find().sort({_id:-1}).limit(1,function(err,rs){
            //console.log(rs)
            if(rs.length==0){
                id=1;
            }else{
                id=rs[0]._id;
                id++
            }
            conn.parentTaskTable.save({_id:id,Parent_Task:dt.Task},addtask())
        })
        // res.send("inserted")
    }else{
        addtask();
    }
    function addtask(){
        // console.log(dt)
        conn.taskTable.find().sort({_id:-1}).limit(1,function(err,rs){
            //console.log(rs)
            if(rs.length==0){
                Id=1;
            }else{
                Id=rs[0]._id;
                Id++
            }
            conn.taskTable.save({_id:Id,Parent_ID:dt.parent_ID,Project_ID:dt.Project_ID,Task:dt.Task,Start_Date:dt.Start_Date,
                End_Date:dt.End_Date,Priority:dt.Priority,Status:""},updateUser())
        })
        res.send("inserted")
    }
    function updateUser(){
        conn.usersTable.update({_id:dt.User_id},{$set:{projectId:dt.Project_ID,taskId:Id}});
    }
})

// ===========  update task  ============
rout.post('/UpdateTask',function(req,res){
    dt=req.body;
conn.taskTable.update({_id:dt._id},{$set:dt})
res.send("updated")
})

rout.get('/getParentTask',function(req,res){
    conn.parentTaskTable.find(function(err,result){
        res.send(result)
    });
})

rout.get('/getTask',function(req,res){
    conn.taskTable.find(function(err,result){
        res.send(result)
    });
})

rout.post('/EndTask',function(req,res){
    dt=req.body;
    // console.log(dt)
    conn.taskTable.update({_id:dt._id},{$set:{Status:"Completed"}})
    res.send("updated")
})


module.exports=rout;