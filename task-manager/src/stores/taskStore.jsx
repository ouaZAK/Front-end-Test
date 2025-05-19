import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  tasks: [],
  users: [],
  loading: false,
  error: null,
  
  fetchTasks: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().user?.token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      set({ tasks: data.tasks || [], loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  fetchUsers: async () => {
    if (!useAuthStore.getState().isAdmin()) return
    
    set({ loading: true })
    try {
      const response = await fetch('/api/users', {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().user?.token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      set({ users: data.users || [], loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  
  createTask: async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useAuthStore.getState().user?.token}`
        },
        body: JSON.stringify(taskData)
      })
      if (!response.ok) throw new Error('Failed to create task')
      const newTask = await response.json()
      set((state) => ({ tasks: [...state.tasks, newTask] }))
      return newTask
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },
  
  // Similar methods for updateTask, deleteTask, etc.
}))