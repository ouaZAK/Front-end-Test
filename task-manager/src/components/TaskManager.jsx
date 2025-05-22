import React, { useCallback, useState, useEffect } from 'react';
import { Check, Edit, Plus, Trash2, User } from 'lucide-react';
import TaskForm from './TaskForm';
import './TaskManager.css';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import useApi from '../services/api';
import TaskItem from './TaskItem';
import Header from './Header';

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



const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
const [editClicked, setEditClicked] = useState(false);

const handleLogout = () => {
	logout();
	console.log('Logout function called');
};

const handleEdit = async (taskUpdated) => {
		// console.log('bef : ', taskUpdated, '=== end ==');
	console.log('entered handl edit')
	if (taskUpdated.id !== undefined) {
    const taskToEdit = tasks.find(task => task.id === taskUpdated.id);
    if (taskToEdit) {
		try {
			const resp = await updateTask(taskUpdated.id, taskUpdated)
			if (!resp) {console.log('err in fetch')}
			setTasks(
				tasks.map((prevTask) => (prevTask.id === taskUpdated.id ? { ...prevTask,  ...taskUpdated } : prevTask))
			)
			setIsAddTaskOpen(false);
			setEditClicked(false);
			console.log('%c@@@@@@@ edit handler @@@@@@', 'color:red;')
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
	} catch (error) {
		console.error('Error deleting task:', error)
	}
}

const handleStatusChange = async (task) => {
		try {
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

const handleComplete = (task) => {
	const taskId = task.id;
	setTasks(tasks.map(task => 
		task.id === taskId ? { ...task, completed: !task.completed } : task
	));
	handleStatusChange(task);
};


const handleAddTask = async (newTaskData) => {
	const newTask = {
		title: newTaskData.title,
		description: newTaskData.description,
		status: 'in_progress',
		assignedTo: newTaskData.assignedTo
	};

	console.log(newTask)
	try {
		const createdTask = await createTask(newTask);
        console.log('Created task:', createdTask);
        if (!createdTask || !createdTask.id) {
            throw new Error('Invalid task creation response');
        }
	
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
		<Header user={user} onLogout={handleLogout} />

		<main className="task-content">
			<h1 className="welcome-title">
				Welcome, <span className="admin-name">{user.firstName || user.lastName || user.username}</span>.
			</h1>
			
			<p className="task-count">{user.role === 'admin' ? 'Your team' : 'You\'ve'} got {taskRemain} tasks to do.</p>
			
			<div className="task-list">
				{filteredTasks.length !== 0 &&
					filteredTasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						isAdmin={isAdmin()}
						onEdit={() => {
							setIsAddTaskOpen(true);
							setEditClicked(true);
							setTaskId(task.id);
						}}
						onDelete={() => handleDelete(task.id)}
						onComplete={() => handleComplete(task)}
					/>
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