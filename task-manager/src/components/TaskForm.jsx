// import { useState } from 'react'
// import useApi from '../services/api'
// import { useAuth } from '../context/AuthContext'

// const TaskForm = ({ task, users, onClose, onTaskUpdated, onTaskCreated }) => {
//   const isEdit = !!task
//   const { createTask, updateTask } = useApi()
//   const { isAdmin } = useAuth()

//   const [formData, setFormData] = useState({
//     title: task?.title || '',
//     description: task?.description || '',
//     assignedTo: task?.assignedTo || '',
//     status: task?.status || 'in_progress',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       if (isEdit) {
//         const updatedTask = await updateTask(task.id, formData)
//         onTaskUpdated(updatedTask)
//       } else {
//         const newTask = await createTask(formData)
//         onTaskCreated(newTask)
//       }
//     } catch (error) {
//       console.error('Error saving task:', error)
//     }
//   }

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h3 className="modal-title">
//             {isEdit ? 'Edit Task' : 'Create Task'}
//           </h3>
//           <button className="modal-close" onClick={onClose}>
//             &times;
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="title">Title</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           {isAdmin() && (
//             <div className="form-group">
//               <label htmlFor="assignedTo">Assign To</label>
//               <select
//                 id="assignedTo"
//                 name="assignedTo"
//                 value={formData.assignedTo}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select User</option>
//                 {users.map((user) => (
//                   <option key={user.username} value={user.username}>
//                     {user.username}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           <div className="form-group">
//             <label htmlFor="status">Status</label>
//             <select
//               id="status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//             >
//               <option value="in_progress">In Progress</option>
//               <option value="done">Done</option>
//             </select>
//           </div>
//           <div className="form-actions">
//             <button type="button" className="btn" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-primary">
//               {isEdit ? 'Update' : 'Create'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default TaskForm


import React, { useEffect, useRef, useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('Task 01');
  const [assignedTo, setAssignedTo] = useState('User');
  const [description, setDescription] = useState(
    'Note: Add relevant details, blockers, or context for this task here.'
  );

  const modalRef = useRef(null);

  const handleSave = () => {
    onSave({
      title,
      user: `@${assignedTo}`,
      description,
    });

    // Reset and close
    setTitle('Task 01');
    setAssignedTo('User');
    setDescription('Note: Add relevant details, blockers, or context for this task here.');
    onClose();
  };

  // Detect outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="taskform-box" ref={modalRef}>
        <h2>Add Task</h2>

        <div className="form-group">
          <label>Task title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Assign to</label>
          <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
            <option value="User">User</option>
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
            <option value="User 3">User 3</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="form-buttons">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={handleSave} className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
