
import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'


const TodosPages = () => {
    const [item,setItem] =useState([])
    const [input,setInput] = useState('')
const [selectedId,setSelectedId] = useState(null)

useEffect(() =>{
    getRequest()
},[])

const getRequest = async() =>{
    try {
        const response = await Axios.get(`http://localhost:8000/todos`)
    setItem(response.data)
    } catch (error) {
        console.error("error",error);
    }
    
}
const postRequest = async (event) => {
    event.preventDefault();
    try {
        if (selectedId !== null) {
            const updatedTodo = {
                title: input
            };
            await Axios.patch(`http://localhost:8000/todos/${selectedId}`, updatedTodo);
        } else {
            const newTodo = {
                title: input,
                status: false
            };
            await Axios.post(`http://localhost:8000/todos`, newTodo, {
                headers: { "Content-Type": 'application/json' }
            });
        }
        getRequest();
        setInput('');
        setSelectedId(null);
    } catch (error) {
        console.error("Error creating/updating todo:", error);
    }
}
const deleteRequest = async(id) =>{
    try {
        await Axios.delete(`http://localhost:8000/todos/${id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        })
        getRequest()
    } catch (error) {
        console.error("error",error);
    }
    

}
const patchRequest = async(id,status) =>{
    try { const edit = {
        status:status
    }

        await Axios.patch(`http://localhost:8000/todos/${id}`,edit,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"}
    })
      getRequest()

    } catch (error) {
        console.error("error",error);
    }
   
    
}


const handleUpdate = (id) => {
    const selectedTodo = item.find(todo => todo.id === id);
    if (selectedTodo) {
        setSelectedId(selectedTodo.id);
        setInput(selectedTodo.title);
    }
}
   return (
    <div style={{padding:"30px"}}>
        <h1>TODO LIST</h1>
      <form onSubmit={postRequest}>
        <input
        value={input}
        onChange={e =>{
            setInput(e.target.value)
        }}
        />
        <button >
            {selectedId !== null ? "update" : "create"}
        </button>
        </form>
        {

        item.map((todo =>
        
        <p key={todo.id} className={todo.status? 'line' : ''}>
<input
 type='checkbox'
checked={todo.status}
onChange={e =>{
    patchRequest(todo.id,e.target.checked)
}}
/>
{todo.title}
<button onClick={() => deleteRequest(todo.id)}>delete</button>
<button onClick={() => handleUpdate(todo.id)}>edit</button>
        </p>

        ))
        }
      
    </div>
  )
}

export default TodosPages
