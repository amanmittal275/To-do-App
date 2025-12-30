import express, { json, text } from "express";
import cors from "cors"
import {v4 as uuidv4} from 'uuid'
const app=express()

app.use(cors())
app.use(express.json())

let todo=[
    {
    id:1,
    title:"learn React",
    fleg:true
},
{
    id:2,
    title:"learn javascript",
    fleg:true
},

]



app.get("/todo",(req,res)=>{
    res.json({
     todo
    })
})

app.post("/new-todo",(req,res)=>{
    console.log("POST API HIT")
    let title=req.body.title
    if(!title){
        return res.json({
            success:false,
            message:" ",
            err:"Title missing",
            data:null
        })
    }
    let obj={
        id:uuidv4(),
        title: title,
        flag:true


    }
   todo.push(obj)

     console.log("CURRENT TODO:", todo);
     return res.json({
            success:true,
            message:"new data added ",
            err:"",
            data:todo
        })

})


app.delete("/delete",(req,res)=>{

    let id=req.query.id
      if(!id){
        return res.json({
             success:false,
            message:" ",
            err:"id missing",
            data:null
        })
      }

      let Exist=todo.find(item=>item.id==id)
      if(!Exist){
        return res.json({
            success:false,
            message:" ",
            err:"do not exist",
            data:null
        })
      }

      todo=todo.filter(item=>item.id != id)

      res.json({
         success:true,
            message:"toda delete ",
            err:"",
            data:todo
      })
})


app.patch("/edit",(req,res)=>{
    let title=req.body.title
    let id=req.query.update
    if(!id||!title){
        return res.json({
            success:false,
            message:" ",
            err:"title or id is missing",
            data:null
        })
    }

    let Exist=todo.find(item=>item.id==id)
    if(!Exist){
        return res.json({
            success:false,
            message:" ",
            err:"do not exist",
            data:null
        })
    }

    for(let t of todo){
        if(t.id==id){
            t.title=title
            break
        }
    }
    return res.json({
        success:true,
            message:"toda update",
            err:"",
            data:todo

    })
})


app.listen(5022,()=>{
    console.log("server startd")
})





