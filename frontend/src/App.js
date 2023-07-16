
import './App.css';
import TodoList from "./componant/TodoList";
import { TodosContext } from './context/todosContext';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const inittodos = [
  {
    id:uuidv4(),
    title:"",
    details:"",
    isCompleted: false
  },  {
    id:uuidv4(),
    title:"",
    details:"",
    isCompleted: false
  },  {
    id:uuidv4(),
    title:"",
    details:"",
    isCompleted: false
  }
]

function App() {
  const [todos,setTodos]= useState(inittodos)

  
  return (
    <div className="App" style={{display:"flex",justifyContent:"center",alignItems:"center",background:"#191b1f",height:"100vh",
    direction:"ltr"}}>
   
      <TodosContext.Provider value={{todos , setTodos }}>
          <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
