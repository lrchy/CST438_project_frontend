import React, {useState, useEffect} from "react";
//dialog imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditTask({task, open, onClose, onSave}){

    const [editedTask, setEditedTask] = useState(task);
    useEffect(() => {
        setEditedTask(task); //load task data when dialog box opens
    }, [task]);

    //if task is null or undefined, return null/nothing
    if(!task){
        /*
        return <div></div>; //return noting
        */
       return null;
    }
    


    const handleChange = (e) => {
        setEditedTask({...editedTask, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        onSave(editedTask);
        onClose(); //close after saving
    };


    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    name='title'
                    label='Title'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={editedTask.title}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='description'
                    label='Decription'
                    type='text'
                    fullWidth
                    variant='standard'
                    value={editedTask.description}
                    onChange={handleChange}
                />
                <TextField
                    margin='dense'
                    name='dueDate'
                    label='Due Date'
                    type='date'
                    fullWidth
                    variant='standard'
                    value={editedTask.dueDate}
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

export default EditTask;