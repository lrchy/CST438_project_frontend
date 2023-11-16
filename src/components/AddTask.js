import React, { useState } from 'react';
//materialUI imports:

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddTask({open, onClose, onSave}) {
    const [task, setTask] = useState({
        title: '',
        description:'', 
        dueDate: '', //format yyyy-mm-dd
        status: 'OPEN' //TODO default status?
    });
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };
    
    const handleSave = () => {
        onSave(task);
        onClose(); // Close dialog after saving
    };
    
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    name='title'
                    label='Title'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={task.title}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='description'
                    label='Decription'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={task.description}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='dueDate'
                    label='Due Date'
                    type='date'
                    fullWidth
                    variant='standard'
                    value={task.dueDate}
                    onChange={handleChange}
                    /*control behavior of the label,
                    always stay in shrunken position above the field*/
                    InputLabelProps={{
                        shrink : true
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddTask;