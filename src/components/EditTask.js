import React, {useState, useEffect} from "react";
//dialog imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import '../styles/EditTask.css';

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
        <Dialog open={open} onClose={onClose} PaperProps={
            { style: { width: '60em', 
                       maxWidth: '80%',
                       borderRadius: '25px',
                       backgroundColor: 'goldenrod',
                       color: 'white' }} }>
            <DialogTitle className="custom-dialog">Edit Task</DialogTitle>
            <DialogContent className="custom-dialog">
                <TextField
                    autoFocus
                    className='custom-textfield'
                    margin='dense'
                    name='title'
                    label='Title'
                    type='text'
                    fullWidth
                    variant='standard'
                    InputProps={{ style: { color: 'white', borderColor: 'white'}}}
                    InputLabelProps={{ style: {color: 'white'}}}
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
                    InputProps={{ style: { color: 'white', borderColor: 'white'}}}
                    InputLabelProps={{ style: {color: 'white'}}}
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
                    InputProps={{ style: { color: 'white', borderColor: 'white'}}}
                    value={editedTask.dueDate}
                    onChange={handleChange}
                    /*control behavior of the label,
                    always stay in shrunken position above the field*/
                    InputLabelProps={{
                        shrink : true,
                        style: {color: 'white'}
                    }}
                />
                <FormControl>
                    <RadioGroup
                    row
                    name='status'
                    value={editedTask.status}
                    onChange={handleChange}
                    >
                    <FormControlLabel
                        value='OPEN'
                        control={<Radio />}
                        label='Open'
                        style={{ color: 'white' }}
                    />
                    <FormControlLabel
                        value='IN PROGRESS'
                        control={<Radio />}
                        label='In Progress'
                        style={{ color: 'white' }}
                    />
                    <FormControlLabel
                        value='COMPLETED'
                        control={<Radio />}
                        label='Completed'
                        InputProps={{ style: {color: 'white'}}}
                        style={{ color: 'white' }}
                    />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions className="custom-dialog">
                <Button id='edit-task-button' onClick={onClose}>Cancel</Button>
                <Button id='edit-task-button' onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditTask;