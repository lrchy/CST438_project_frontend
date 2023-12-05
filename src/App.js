import React, {useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListTask from './components/ListTask';
import EditTask from './components/EditTask';
import ViewTask from './components/ViewTask';
import Button from '@mui/material/Button';
import AddTask from './components/AddTask';

//import login from './components/Login';

import './styles/App.css';
import { SERVER_URL } from './constants';

//TODO change this when implementing LOGIN
function App() {
  
  const[tasks, setTasks]= useState([]);
  //dialog :
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  //for editing :
  const [currentTask, setCurrentTask] = useState(null);

  //use for security later : 
  //const [message, setMessage] = useState('');
  //const token = sessionStorage.getItem("jwt");

  //fetch tasks from backend
  useEffect(() => {
    fetch(`${SERVER_URL}/tasks`)
    .then(response =>response.json())
    .then(data => {
      console.log("fetched tasks", data); //check fetched data
      setTasks(data);
    })
    .catch(error=> console.error('Error fetching tasks', error));
  }, []);

  //send request to backend to delete a task
  const handleDelete = (taskId) =>{
    fetch(`${SERVER_URL}/tasks/${taskId}`,{method : 'DELETE'})
    .then(response => {
      if (response.ok) {
        console.log("delete success")
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Error deleting task');
      }
    })
    .catch(error => console.error('Error', error));
  };

  //open add task dialog box :
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  //close add task dialogbox :
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenViewDialog = () => {
    setOpenViewDialog(true);
  }

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  }

  //save new task
  //backend API call
  const handleSaveTask = (newTask) => {
    fetch(`${SERVER_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(savedTask => {
      setTasks([...tasks, savedTask]); //add new task to state
      handleCloseAddDialog();
  })
  .catch(error => console.error('Network error', error));
  };

  //open edit task dialog box :
  const handleOpenEditDialog = (task) => {
    setCurrentTask(task);
    setOpenEditDialog(true);
  }

  //close edit dialog:
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  //update task backend call
  const handleSaveEditedTask = (editedTask) => {
    console.log("Updating Task:", editedTask);
    fetch(`${SERVER_URL}/tasks/${editedTask.id}`,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(editedTask)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })

    //updatedTask is what has been successfully updated and confirmed by the server
    .then(updatedTask => {
      //update task in the tasks array
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      handleCloseEditDialog(); //close dialog
    })
    .catch(error => console.error('Error while editing task', error));
  };

  return (
    <div className="App">
      <h1>Task-Man</h1> <span id='span-text'>The amazing task manager!</span>
      
      <div style={{textAlign: 'right', width : '90%', paddingBottom: '2em' }}>
        <Button id='create-button' variant='contained' size='large' onClick={handleOpenAddDialog}> Create Task</Button>
        <Button id='login-button' variant='contained' size='large'> Login </Button>
      </div>
      
      <AddTask open={openAddDialog} onClose={handleCloseAddDialog} onSave={handleSaveTask} />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<div id="task-container"><ListTask tasks={tasks} onDelete={handleDelete} onEdit={handleOpenEditDialog} onView={handleOpenViewDialog}/></div>} />
          </Routes>
      </BrowserRouter>
      {currentTask && (
      <EditTask 
        task={currentTask}
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onSave={handleSaveEditedTask}
      />
      )}
      {currentTask && (
        <ViewTask
        task={currentTask}
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        />
      )}
    </div>
  );
}
export default App;
