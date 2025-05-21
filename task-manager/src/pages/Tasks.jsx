// import { useEffect, useState } from 'react';
// import { useAuthStore } from '../stores/authStore';
// import { authFetch } from '../utils/api';
// import TaskItem from '../components/TaskItem';
// import Header from '../components/Header';

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
// //   const { user } = useAuthStore();
// const user = useAuthStore(state => state.user);

//   const isAdmin = user?.role === 'admin';

//   // Fetch tasks once
//   const fetchTasks = () => {
//     authFetch('/api/tasks')
//       .then(res => res.json())
//       .then(data => setTasks(data))
//       .catch(err => {
//         console.error('Failed to fetch tasks:', err);
//       });
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="task-list">
//         {isAdmin && (
//           <button onClick={() => {/* open modal */}}>+ Create Task</button>
//         )}
//         {tasks.map(task => (
//           <TaskItem
//             key={task.id}
//             task={task}
//             isAdmin={isAdmin}
//             onRefresh={fetchTasks} // Pass function, not redefined inline
//           />
//         ))}
//       </div>
//     </>
//   );
// }



import TaskList from '../components/TaskList'
import TaskManager from '../components/TaskManager'

const Tasks = () => {
  return (
	<>
    {/* <div className="tasks-page">
      <TaskList />
    </div> */}
	<div className="min-h-screen bg-gray-50">
      <TaskManager />
    </div>
	</>
  )
}

export default Tasks