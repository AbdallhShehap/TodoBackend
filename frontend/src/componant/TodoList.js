import * as React from 'react';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TodosContext } from '../context/todosContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Todo from './Todoo';

import { useState } from 'react';
import { useEffect } from 'react';








export default function TodoList() {
  const {todos , setTodos} = useContext(TodosContext)
  const {sss,setsss}= useState([])
  useEffect(()=>{
    fetch('http://localhost:9000')
    .then(response=>response.json())
    .then(data=>{
        setTodos(data.output)
    })

  },[])
  const [titleInput, setTitleInput]= useState("")

  function handelcheckClick(todoId){
    const updatedTodos =todos.map((t)=>{

      if(t.id == todoId){
        t.isCompleted = !t.isCompleted
      }return t;

    });
    setTodos(updatedTodos)
  
  }


  const todosjxs = todos.map((t)=>{
    return <Todo key={t.id} todo={t} handelCheck={handelcheckClick}/>
  })


  async function handelAddClick (){
    const newTodo = {
      id:uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    }
    // setTodos([...todos, newTodo])
     await fetch('http://localhost:9000/', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(newTodo)})
  }

   fetch('http://localhost:9000')
  .then(response=>response.json())
  .then(data=>{
    setTodos(data.output)
    
    })


  return (
    <>
      
      <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h2'>
        Mussion
        </Typography>
        <Divider />

        {/* Filter Buttons */}


        <ToggleButtonGroup style={{ marginTop:"30px"}}
    >
      <ToggleButton value="left" >
      All
      </ToggleButton>
      <ToggleButton value="center">
        Done
      </ToggleButton>
      <ToggleButton value="right" >
        Prepaering
      </ToggleButton>
     
    </ToggleButtonGroup>



    {todosjxs}



    <Grid container style={{marginTop:"20px"}}>
      <Grid xs={8}
      display="flex"
      justifyContent="space-around"
      alignItems='center'
      style={{}}
      >
              <TextField id="outlined-basic" label="Mussion Type" variant="outlined" style={{width:"100%"}}  
              value={titleInput}
              onChange={(e)=> {
                setTitleInput(e.target.value)
              }}
              />

      </Grid>

      <Grid xs={4}
      display="flex"
      justifyContent="space-around"
      alignItems='center'
      style={{background: "orange"}}
      >
              <Button variant="contained" style={{width:"100%",height:"100%"}}
              onClick={()=>{
                handelAddClick()
              }}
              >Add</Button>

      </Grid>
    </Grid>


      </CardContent>
     
    </Card>
      </Container>
    </>
  );
}