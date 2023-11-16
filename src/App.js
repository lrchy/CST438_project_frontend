import React, {useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import ListTask from './components/ListTask';
import EditTask from './components/EditTask';
import Button from '@mui/material/Button';
import AddTask from './components/AddTask';

//import login from './components/Login';

import './App.css';
import { SERVER_URL } from './constants';

//TODO change this when implementing LOGIN
function App() {
  const[tasks, setTasks]= useState([]);
  //dialog :
  const [openAddDialog, setOpenAddDialog] = useState(false);
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

  return (
    <div className="App">
      <h2>Task Manager</h2>
      <Button variant='contained' size='small' onClick={handleOpenAddDialog}> Create Task</Button>
      <AddTask open={openAddDialog} onClose={handleCloseAddDialog} onSave={handleSaveTask} />
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<ListTask tasks={tasks} onDelete={handleDelete} />} />
            <Route path="/edit/:id" element={<EditTask/>} />
              {/* Add more routes as needed */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
