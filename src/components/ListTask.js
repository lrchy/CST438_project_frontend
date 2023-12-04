import React from 'react';
//import {SERVER_URL} from '../constants';

import '../styles/ListTask.css';
//display the date/time of creation in a better way
function formatCreationDate(dateString){
    const options = { year : 'numeric', month : '2-digit', day : '2-digit', hour : '2-digit', minute:'2-digit'};
    //toLocaleString displays the time according to browsers settings
    return new Date(dateString).toLocaleString(undefined, options).replace(',','@');
}

function formatDueDate(dateString){
    const options = { year : 'numeric', month : '2-digit', day : '2-digit'};
    //toLocaleString displays the time according to browsers settings
    return new Date(dateString).toLocaleString(undefined, options).replace(',','@');
}

function ListTask({tasks, onDelete, onEdit}) {
    console.log("rendering", tasks); //check received tasks
    return(
      <div id="task">
        {tasks.map((task) => (
          <div class="task-card">
            <h3> {task.title} </h3>
            <div class="task-content">
              <div>{task.status}</div>
              <div>Priority</div>
              <div>{task.dueDate}</div>
            </div>
            <div class="task-options">
              <button class="task-button" onClick={() => onEdit(task)}>EDIT</button>
              <button class="task-button" onClick={() => onDelete(task)}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    );
}

export default ListTask;
