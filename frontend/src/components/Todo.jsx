import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"

const Todo = () => {
const [text,setText]=useState("")
const [todoArr,setTodoArr]=useState([])
const [update,setUpdate] =useState("")




function change(e){
    // e.preventDefault()
    setText(e.target.value)
}

 function submit(e){
    e.preventDefault()
    if(!update){
     handlePost()
     
    }else{
       handleUpdate()
       setUpdate("")
    }
    setText("")
    

  }
  async function handlePost(){
       try{
   let response=  await axios.post("http://localhost:5022/new-todo",{title:text })
   setTodoArr(response.data.data)
  
   }
  catch(err){
    console.log(err)
  }
  }


  async function handleUpdate(){
     try{
   let response=  await axios.patch("http://localhost:5022/edit",{title:text },{params:{update}})
   setTodoArr(response.data.data)
  
   }
  catch(err){
    console.log(err)
  }
  }

useEffect(()=>{
     
  
axios.get("http://localhost:5022/todo")
.then(res=>setTodoArr(res.data.todo))
.catch(err=>console.log(err))

},[])

async function deleteTodo(id){
  try{
  let res= await axios.delete("http://localhost:5022/delete",{params:{id}})
setTodoArr(res.data.data)
  }
  catch(err){
    console.log(err)
  }
      





}

  return (
    <div>
        <form onSubmit={submit} >
      <input type="text" placeholder={update?"update-todo":"add-todo"} onChange={change} value={text} />
      <button>{update?"update-todo":"add-todo"}</button>
      </form>

      {
        todoArr.length>0 &&
        <ul>
          {
            todoArr.map(item=>(

              <li key={item.id}>
                {item.title}
                <button onClick={()=>{deleteTodo(item.id)}}>D</button>
                <button onClick={()=>{
                  setUpdate(item.id)
                  setText(item.title)

                  }}>E</button>
                </li>
            ))
          }
        </ul>
      }
    </div>
  )
}

export default Todo
