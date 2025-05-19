// import { useAuthStore } from '../stores/authStore'
import { authFetch } from '../utils/api'
export default function TaskItem({ task, isAdmin, onRefresh }) {
  const handleToggleStatus = async () => {
    try {
      const res = await authFetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: task.status === 'done' ? 'in_progress' : 'done'
        })
      });
      if (res.ok) {
        onRefresh(); // Only call when update is confirmed
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <button onClick={handleToggleStatus}>
        {task.status === 'done' ? 'Mark In Progress' : 'Mark Done'}
      </button>

      {isAdmin && (
        <button onClick={() => {/* handle delete */}}>Delete</button>
      )}
    </div>
  );
}
