import React, { useCallback, useState, useEffect } from 'react';
import { Check, Edit, Plus, Trash2, User } from 'lucide-react';
import TaskForm from './TaskForm';
import './TaskManager.css';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import adminIcon from "../assets/adminIcon.svg";
import userIcon from "../assets/userIcon.svg";
import checkDone from "../assets/done.svg";
import check from "../assets/check.svg";
import useApi from '../services/api';

const TaskManager = () => {
const { user, logout, isAdmin } = useAuth();
const { getTasks, getUsers, updateTask, deleteTask, createTask } = useApi()
const [users, setUsers] = useState([])

const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const [taskId, setTaskId] = useState(0)

// const filteredTasks = isAdmin() ? tasks : tasks.filter((task) => task.assignedTo === user.username)
const [taskRemain, setTaskRemain] = useState(0);

const filteredTasks = useMemo(() => {
  return isAdmin() ? tasks : tasks.filter((task) => task.assignedTo === user.username);
}, [tasks, user, isAdmin]);

const fetchData = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)
			
			const tasksData = await getTasks()
			setTasks(tasksData)
			console.log(tasksData)
			if (isAdmin()) {
				const usersData = await getUsers()
				setUsers(usersData)
			} 
		} catch (error) {
			console.error('Error fetching data:', error)
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}, [getTasks, getUsers, isAdmin])

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const remaining = filteredTasks.filter((task) => task.status !== 'done' && !task.completed).length;
		setTaskRemain(remaining);
	}, [filteredTasks]);



// Task form dialog state
const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
const [editClicked, setEditClicked] = useState(false);

// Function to handle logout - this will be provided by you
const handleLogout = () => {
	logout();
	console.log('Logout function called');
};

// Function to handle edit - this will be provided by you
const handleEdit = async (taskUpdated) => {
		// console.log('bef : ', taskUpdated, '=== end ==');
	console.log('entered handl edit')
	if (taskUpdated.id !== undefined) {
    const taskToEdit = tasks.find(task => task.id === taskUpdated.id);
    if (taskToEdit) {
		try {
			const resp = await updateTask(taskUpdated.id, taskUpdated)
			
			setTasks(
				tasks.map((prevTask) => (prevTask.id === taskUpdated.id ? { ...prevTask,  ...taskUpdated } : prevTask))
			)
			setIsAddTaskOpen(false);
			setEditClicked(false);
			console.log('task updated click false')
			// console.log('task updated : ', resp,' ', resp.id, '=== end ==');
			return;
			} catch (error) {
				console.error('Error updating task status:', error)
			}
			console.log('Edited task:', tasks, '-------++++++',);
    }
    setIsAddTaskOpen(true);
  }
};

const handleDelete = async (taskId) => {
	try {
		setTasks(tasks.filter((task) => task.id !== taskId))
		await deleteTask(taskId)
		// await fetchData();
	} catch (error) {
		console.error('Error deleting task:', error)
	}
}

const handleStatusChange = async (task) => {
		try {
			console.log('@@@@@@@@@@@@ 1')
			console.log(task)
			console.log(task.status)
			console.log('@@@@@@@@@@@@ 2')
		const newStatus = task.status === 'done' ? 'in_progress' : 'done'
		const updatedTask = { ...task, status: newStatus }
		await updateTask(task.id, updatedTask)
		setTasks(
			tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
		)
		} catch (error) {
		console.error('Error updating task status:', error)
		}
	}

// Function to mark a task as complete
const handleComplete = (task) => {
	const taskId = task.id;
	setTasks(tasks.map(task => 
		task.id === taskId ? { ...task, completed: !task.completed } : task
	));
	handleStatusChange(task);
};


// Function to add a new task
const handleAddTask = async (newTaskData) => {
	const newTask = {
		// id: Date.now(),
		title: newTaskData.title,
		description: newTaskData.description,
		status: 'in_progress',
		assignedTo: newTaskData.assignedTo
	};

	console.log(newTask)
	try {
		// const data = await createTask(newTask)
		// setTasks(data);
		// setIsAddTaskOpen(false);
		const createdTask = await createTask(newTask);
        console.log('Created task:', createdTask);
        if (!createdTask || !createdTask.id) {
            throw new Error('Invalid task creation response');
        }
		
        // Add the new task to existing tasks
        setTasks(prevTasks => [...prevTasks, createdTask]);
        setIsAddTaskOpen(false);

		setTimeout(async () => {
			const freshData = await getTasks();
			setTasks(freshData); 
		}, 500);
	} catch (error) {
		console.error('Error deleting task:', error)
		// setTasks(prev => prev.filter(t => t.id !== createdTask?.id));
	}
};

if (loading) return <div>Loading tasks...</div>
if (error) return <div className="error-message">Error: {error}</div>

return (
	<div className="task-manager">
	<header className="task-header">
		<div className="logo">
		<div className="logo-icon">
			<img src={check} alt="" />
		</div>
		<span>Taski</span>
		</div>
		{user && (
			<div className="admin-container">
			<span>{user.username}</span>
			<button  className="admin-avatar" onClick={handleLogout}>
				<img src={user.role === 'admin' ? adminIcon : userIcon} alt="" />
			</button >
			</div>)
		}
	</header>

	<main className="task-content">
		<h1 className="welcome-title">
			Welcome, <span className="admin-name">{user.firstName || user.lastName || user.username}</span>.
		</h1>
		
		<p className="task-count">{user.role === 'admin' ? 'Your team' : 'You\'ve'} got {taskRemain} tasks to do.</p>
		
		<div className="task-list">
			{filteredTasks.length !== 0 &&
				filteredTasks.map((task, key) => ( 
					<div key={key} className={`task-item ${task.completed || task.status === 'done' ? 'completed' : ''}` }>
						<div className="task-item-content">
							<div className={`task-checkDone ${task.completed || task.status === 'done' ? 'show' : ''}`}>
								<img src={checkDone} alt="" />
							</div>
							<div>
								<div className="task-@">@{task.assignedTo}</div>
								<div className="task-title">{task.title}</div>
								<div className="task-description truncate">
									{task.description.length > 40 ? task.description.slice(0, 40) + '...' : task.description}
								</div>
							</div>
						</div>

						<div className="task-actions">
							{!task.completed && (
								<button className="edit-button" onClick={() => {
																				setIsAddTaskOpen(true);
																				setEditClicked(true);
																				setTaskId(task.id)
																			}}>
									<Edit size={18} />
								</button>)}

							{isAdmin() && <button className="delete-button" onClick={() => handleDelete(task.id)}>
								<Trash2 size={18} />
							</button>}

							{!task.completed && (
							<button className="done-button" onClick={() => handleComplete(task)}>
								<Check size={16} />
								<span>Done</span>
							</button>)}
						</div>
					</div>
				))}
			</div>
				

		{isAdmin() && (
			<button className="add-task-button" onClick={() => setIsAddTaskOpen(true)}>
				<Plus size={16} />
				<span>Add a new task...</span>
			</button> )}
		<TaskForm open={isAddTaskOpen} onClose={() => {setIsAddTaskOpen(false); setEditClicked(false)}} onSave={editClicked ? handleEdit : handleAddTask} users={users} tskId={taskId}/>
	</main>
	</div>
);
};

export default TaskManager;