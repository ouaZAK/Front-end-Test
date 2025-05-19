import React, { useState } from 'react';
import { Check, Edit, Plus, Trash2, User } from 'lucide-react';
import TaskForm from './TaskForm';
import './TaskManager.css';

const TaskManager = () => {
  // Initial tasks - you can replace this with your own data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      user: '@User 1',
      title: 'Task 01',
      description: 'Note: Add relevant details, blockers, or context for this task here.',
      completed: false
    },
    {
      id: 2,
      user: '@User 2',
      title: 'Task 02',
      description: 'Note: Add relevant details, blockers, or context for this task here.',
      completed: false
    },
    {
      id: 3,
      user: '@User 3',
      title: 'Task 03',
      description: 'Note: Add relevant details, blockers, or context for this task here.',
      completed: false
    }
  ]);


// Task form dialog state
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Function to handle logout - this will be provided by you
  const handleLogout = () => {
    // You will implement this function
    console.log('Logout function called');
  };

  // Function to handle edit - this will be provided by you
  const handleEdit = (taskId) => {
    // You will implement this function
    console.log('Edit task:', taskId);
  };

  // Function to delete a task
  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to mark a task as complete
  const handleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to add a new task
   const handleAddTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      user: newTaskData.user,
      title: newTaskData.title,
      description: newTaskData.description,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
	setIsAddTaskOpen(false);
  };

  return (
    <div className="task-manager">
      <header className="task-header">
        <div className="logo">
          <div className="logo-icon">
            <Check />
          </div>
          <span>Taski</span>
        </div>
        <div className="admin-container" onClick={handleLogout}>
          <span>Admin</span>
          <div className="admin-avatar">
            <User />
          </div>
        </div>
      </header>

      <main className="task-content">
        <h1 className="welcome-title">
          Welcome, <span className="admin-name">Admin</span>.
        </h1>
        <p className="task-count">
          Your team got {tasks.length} tasks to do.
        </p>

        <div className="task-list">
          {tasks.map(task => (
            <div 
  key={task.id} 
  className={`task-item ${task.completed ? 'completed' : ''}`}
>
  <div className="task-item-content">
    <div className="task-user">{task.user}</div>
    <div className="task-title">{task.title}</div>
    <div className="task-description">{task.description}</div>
  </div>

  <div className="task-actions">
    {!task.completed && (
      <>
        <button 
          className="edit-button" 
          onClick={() => handleEdit(task.id)}
        >
          <Edit size={18} />
        </button>
        <button 
          className="done-button" 
          onClick={() => handleComplete(task.id)}
        >
          <Check size={16} />
          <span>Done</span>
        </button>
      </>
    )}
    <button 
      className="delete-button" 
      onClick={() => handleDelete(task.id)}
    >
      <Trash2 size={18} />
    </button>
  </div>
</div>


          ))}
        </div>

        <button className="add-task-button" onClick={() => setIsAddTaskOpen(true)}>
          <Plus size={16} />
          <span>Add a new task...</span>
        </button>
		   <TaskForm 
			open={isAddTaskOpen} 
			onClose={() => setIsAddTaskOpen(false)} 
			onSave={handleAddTask} 
			/>
      </main>
    </div>
  );
};

export default TaskManager;