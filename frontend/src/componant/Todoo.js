import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TextField from '@mui/material/TextField';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../context/todosContext";
import { useEffect } from "react";


export default function Todo({ todo , handelCheck }) {
 const {todos , setTodos} = useContext(TodosContext)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo , setUpdatedTodo] = useState({ title: "", details:""});


  useEffect(()=>{
    fetch('http://localhost:9000')
    .then(response=>response.json())
    .then(data=>{
        setTodos(data.output)
    })

  },[todos])



  function handleDeleteClick() {
    if (handleDeleteClick === true) {
      setShowDeleteDialog(false);
    } else {
      setShowDeleteDialog(true);
    }
  }

  function handelUpdateClick(){
    setShowUpdateDialog(true);
  }



  function handelDeleteDialogClose(){
    setShowDeleteDialog(false);
  }

  function handelUpdateClose(){
    setShowUpdateDialog(false);
  }



  function handelDeleteConferm() {
    const updatedTodos = todos.filter((t)=>{
      if(t.id == todo.id){
        return false
      }else{
        return true
      }
    })   
    fetch("http://localhost:9000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodos),
    }
    
    );
    setTodos(updatedTodos)
  }


  function handelUpdateConferm() {
    const updatedTodos = todos.map((t)=>{
      if(t.id == todo.id){
        return{...t,title: updatedTodo.title, details: updatedTodo.details}
      }else{
        return t
      }
    })
    fetch("http://localhost:9000/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodos),
    }
    
    );
    setTodos(updatedTodos)
      setShowUpdateDialog(false)
  }



  function handelcheckClick(){
    handelCheck(todo.id)
  }
  return (
    <>
      <Dialog
        onClose={handelDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure do you want to delete this list
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handelDeleteDialogClose();
            }}
          >
            Disagree
          </Button>

          <Button
            onClick={() => {
              // setShowDeleteDialog(false)
              handelDeleteConferm();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

            {/* update Dialog */}

            <Dialog
        onClose={handelUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Use Google's location service?
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e)=>{
              setUpdatedTodo({...updatedTodo, title: e.target.value})
            }}
          />

            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Address"
            type="email"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e)=>{
              setUpdatedTodo({...updatedTodo, details: e.target.value})
            }}
          />



        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handelUpdateClose();
            }}
          >
            Disagree
          </Button>

          <Button
            onClick={() => {
              // setShowDeleteDialog(false)
              handelUpdateConferm();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>


      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography variant="h5" sx={{}}>
                {todo.title}
              </Typography>

              <Typography variant="h5" sx={{}}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* check icon btn */}
              <IconButton
              onClick={()=>{
                handelcheckClick()
              }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }} 
              >
                <CheckIcon />
              </IconButton>


                {/* Edite BTN */}
              <IconButton
              onClick={handelUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={() => {
                  handleDeleteClick();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
