import { useState, useEffect } from 'react';

export default function TaskModal({ isOpen, onClose, onSave, task = {}, users = [], isAdmin }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    assigned_to: ''
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        assigned_to: task.assigned_to || ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{task.id ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </label>
          {isAdmin && (
            <label>
              Assign to:
              <select name="assigned_to" value={form.assigned_to} onChange={handleChange}>
                <option value="">Select user</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.username}</option>
                ))}
              </select>
            </label>
          )}
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
