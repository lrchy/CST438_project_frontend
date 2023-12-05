import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function TaskCard({ task, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="task-view">
          <h3>{task.description}</h3>
      </div>
    
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
    </DialogActions>
    </Dialog>
  );
}

export default TaskCard;