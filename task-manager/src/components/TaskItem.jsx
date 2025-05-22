import React from 'react';
import { Check, Edit, Trash2 } from 'lucide-react';
import checkDone from "../assets/done.svg";

const TaskItem = ({ 
  task, 
  isAdmin, 
  onEdit, 
  onDelete, 
  onComplete 
}) => {
  return (
    <div className={`task-item ${task.completed || task.status === 'done' ? 'completed' : ''}`}>
      <div className="task-item-content">
        <div className={`task-checkDone ${task.completed || task.status === 'done' ? 'show' : ''}`}>
          <img src={checkDone} alt="" />
        </div>
        <div className='tasks-wrap'>
          <div className="task-@">@{task.assignedTo}</div>
          <div className="task-title">{task.title}</div>
          <div className="task-description truncate">
            {task.description.length > 120 ? 
              task.description.slice(0, 120) + '...' : 
              task.description}
          </div>
        </div>
      </div>

      <div className="task-actions">
        {!task.completed && (
          <button className="edit-button" onClick={onEdit}>
            <Edit size={18} />
          </button>
        )}

        {isAdmin && (
          <button className="delete-button" onClick={onDelete}>
            <Trash2 size={18} />
          </button>
        )}

        {!task.completed && (
          <button className="done-button" onClick={onComplete}>
            <Check size={16} />
            <span>Done</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;