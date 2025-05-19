// import { useState, useEffect } from 'react'
// import useApi from '../services/api'
// import { useAuth } from '../context/AuthContext'
// import TaskForm from './TaskForm'

// const TaskList = () => {
//   const [tasks, setTasks] = useState([])
//   const [users, setUsers] = useState([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [currentTask, setCurrentTask] = useState(null)
//   const { getTasks, getUsers, deleteTask, updateTask } = useApi()
//   const { isAdmin, user } = useAuth()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tasksData = await getTasks()
//         setTasks(tasksData)

//         if (isAdmin()) {
//           const usersData = await getUsers()
//           setUsers(usersData)
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }
// 	// console.log('-------')
//     fetchData()
//   }, [getTasks, getUsers, isAdmin])

//   const handleDelete = async (id) => {
//     try {
//       await deleteTask(id)
//       setTasks(tasks.filter((task) => task.id !== id))
//     } catch (error) {
//       console.error('Error deleting task:', error)
//     }
//   }

//   const handleStatusChange = async (task) => {
//     try {
//       const newStatus = task.status === 'done' ? 'in_progress' : 'done'
//       const updatedTask = { ...task, status: newStatus }
//       const result = await updateTask(task.id, updatedTask)
//       setTasks(
//         tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
//       )
//     } catch (error) {
//       console.error('Error updating task status:', error)
//     }
//   }

//   const handleEdit = (task) => {
//     setCurrentTask(task)
//     setIsModalOpen(true)
//   }

//   const handleTaskUpdated = (updatedTask) => {
//     setTasks(
//       tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
//     )
//     setIsModalOpen(false)
//   }

//   const handleTaskCreated = (newTask) => {
//     setTasks([...tasks, newTask])
//     setIsModalOpen(false)
//   }

//   const filteredTasks = isAdmin()
//     ? tasks
//     : tasks.filter((task) => task.assignedTo === user.username)

//   return (
//     <div className="task-list-container">
//       <div className="task-list-header">
//         <h2>Tasks</h2>
//         {isAdmin() && (
//           <button
//             className="btn btn-primary"
//             onClick={() => {
//               setCurrentTask(null)
//               setIsModalOpen(true)
//             }}
//           >
//             Create Task
//           </button>
//         )}
//       </div>

//       <div className="task-list">
//         {filteredTasks.length === 0 ? (
//           <p>No tasks found</p>
//         ) : (
//           filteredTasks.map((task) => (
//             <div key={task.id} className="task-card">
//               <div className="task-header">
//                 <h3 className="task-title">{task.title}</h3>
//                 <span className={`task-status status-${task.status}`}>
//                   {task.status.replace('_', ' ')}
//                 </span>
//               </div>
//               <p>{task.description}</p>
//               {isAdmin() && <p>Assigned to: {task.assignedTo}</p>}
//               <div className="task-actions">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleEdit(task)}
//                   disabled={!isAdmin() && task.assignedTo !== user.username}
//                 >
//                   Edit
//                 </button>
//                 {isAdmin() && (
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(task.id)}
//                   >
//                     Delete
//                   </button>
//                 )}
//                 <button
//                   className="btn"
//                   onClick={() => handleStatusChange(task)}
//                   disabled={!isAdmin() && task.assignedTo !== user.username}
//                 >
//                   {task.status === 'done' ? 'Mark In Progress' : 'Mark Done'}
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {isModalOpen && (
//         <TaskForm
//           task={currentTask}
//           users={users}
//           onClose={() => setIsModalOpen(false)}
//           onTaskUpdated={handleTaskUpdated}
//           onTaskCreated={handleTaskCreated}
//         />
//       )}
//     </div>
//   )
// }

// export default TaskList

import { useState, useEffect, useCallback } from 'react'
import useApi from '../services/api'
import { useAuth } from '../context/AuthContext'
import TaskForm from './TaskForm'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { getTasks, getUsers } = useApi()
  const { isAdmin, user } = useAuth()

// -----------------------  START --------------------------------------
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const tasksData = await getTasks()
      setTasks(tasksData)

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
	// console.log('------------')
    fetchData()
  }, [fetchData])
// -------------------------------------------------------------

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
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

  const handleEdit = (task) => {
    setCurrentTask(task)
    setIsModalOpen(true)
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
    setIsModalOpen(false)
  }

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask])
    setIsModalOpen(false)
  }

  const filteredTasks = isAdmin()
    ? tasks
    : tasks.filter((task) => task.assignedTo === user.username)

//   if (loading) return <div>Loading tasks...</div>
  if (error) return <div className="error-message">Error: {error}</div>

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks</h2>
        {isAdmin() && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrentTask(null)
              setIsModalOpen(true)
            }}
          >
            Create Task
          </button>
        )}
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`task-status status-${task.status}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              <p>{task.description}</p>
              {isAdmin() && <p>Assigned to: {task.assignedTo}</p>}
              <div className="task-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(task)}
                  disabled={!isAdmin() && task.assignedTo !== user.username}
                >
                  Edit
                </button>
                {isAdmin() && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                )}
                <button
                  className="btn"
                  onClick={() => handleStatusChange(task)}
                  disabled={!isAdmin() && task.assignedTo !== user.username}
                >
                  {task.status === 'done' ? 'Mark In Progress' : 'Mark Done'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <TaskForm
          task={currentTask}
          users={users}
          onClose={() => setIsModalOpen(false)}
          onTaskUpdated={handleTaskUpdated}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </div>
  )
}

export default TaskList