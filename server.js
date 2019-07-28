exp =require("express")
bp=require("body-parser")
AddUser=require("./nodefiles/AddUser")
AddProject=require("./nodefiles/AddProject")
AddTask=require("./nodefiles/AddTask")
port = process.env.PORT || 8080

app=exp();
app.use(bp.json())
var cors = require('cors');
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
app.use(cors(corsOptions));
app.use("/AddUser",AddUser)
app.use("/AddProject",AddProject)
app.use("/AddTask",AddTask)

app.listen(port)
console.log(`server started port no ${port} `)