exp=require("express")
mj=require("mongojs")
// conn=mj("mongodb://localhost:27017/ProjectManager")
conn = mj("mongodb://pm1:pm1234@ds137827.mlab.com:37827/pm")

rout=exp.Router()
rout.post('/addProject',function(req,res){
    dt=req.body;
    // console.log(dt)
    conn.projectTable.find({Project:dt.Project},(err,result)=>{
        // console.log(result)
        if(result.length != 0){
            res.send({status:404})
        }else{
            conn.projectTable.find().sort({_id:-1}).limit(1,function(err,rs){
                //console.log(rs)
                if(rs.length==0){
                    id=1;
                }else{
                    id=rs[0]._id;
                    id++
                }
                conn.projectTable.save({_id:id,Project:dt.Project,StartDate:dt.StartDate,EndDate:dt.EndDate,Priority:dt.Priority})
            })
            res.send({status:200})
        }
    })

})

rout.get('/getProjects',function(req,res){
    conn.projectTable.find(function(err,result){
        res.send(result)
    });
})

rout.post('/updateProject',function(req,res){
    dt=req.body;
    //console.log(dt)
    conn.projectTable.find({Project:dt.Project},(err,result)=>{
        // console.log(result)
        if(result.length != 0){
            for(i=0;i<=result.length-1;i++){
                if(result[i]._id == dt._id){
                    conn.projectTable.update({_id:dt._id},{$set:dt})
                    res.send({status:200})
                }else{
                    if(i == result.length-1){
                        res.send({status:404})
                    }
                }
            }
        }else{
            conn.projectTable.update({_id:dt._id},{$set:dt})
            res.send({status:200})
        }
    })
})

rout.post('/deletUser',function(req,res){
    dt=req.body;
    conn.usersTable.remove(dt)
    res.send("deleted")
})
module.exports=rout;