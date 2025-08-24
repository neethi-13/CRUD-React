const express = require("express");
const users = require("./sample.json")
const cors = require("cors");
const app = express();
app.use(express.json());

const fs = require("fs");
const port = 8000;  
//display All users

app.use(cors({
    origin:[ "http://localhost:5173",
        "https://neethi-crud.vercel.app/"
    ],
    methods :["GET","POST","PATCH","DELETE"],
}));
app.get("/users", (req,res)=>{
return res.json(users);
});
//Add New User

app.post("/users" , (req,res)=>{
    const {name,age , city} = req.body;
    //console.log("req: ",req.body);
   
    let id = Date.now();
    users.push({id,name,age,city});

    fs.writeFile("./sample.json" , JSON.stringify(users),(err , data)=>{
        if(err){
           return window.log(err);
            
        }
        return res.json({message:"user detail added  successfully"});
    });

    
})

//Update User

app.patch("/users/:id" , (req,res)=>{
    let id = Number(req.params.id);

    const {name,age , city} = req.body;
    //console.log("req: ",req.body);
   
     
    let index = users.findIndex((us)=>us.id == id);
    users.splice(index , 1,{...req.body});

    fs.writeFile("./sample.json" , JSON.stringify(users),(err , data)=>{
        if(err){
           return window.log(err);
            
        }
        return res.json({message:"user detail Updated successfully"});
    });

    
})



//delete user detail
app.delete("/users/:id",(req,res)=>{
    const id = Number( req.params.id);
    const filtereduser = users.filter((us) =>us.id !== id);
    fs.writeFile("./sample.json" , JSON.stringify(filtereduser),(err , data)=>{
        if(err){
           return window.log(err);
            
        }
        return res.json(filtereduser);
    });

})
app.listen(port , (err)=>{
    console.log(`App is running in port ${port}`);
})