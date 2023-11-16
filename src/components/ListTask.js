import React from 'react';
//import {SERVER_URL} from '../constants';

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
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{formatDueDate(task.dueDate)}</td>
                <td>{formatCreationDate(task.createdAt)}</td>
                <td>
                  <button onClick={() => onEdit(task)}>Edit</button>
                  <button onClick={() => onDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

export default ListTask;
