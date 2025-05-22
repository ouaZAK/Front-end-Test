import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'


const useApi = () => {
  const { user } = useAuth()

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (user?.token) {
      headers.Authorization = `Bearer ${user.token}`
    }

    try {
      const response = await fetch(`https://recruter-backend.vercel.app/api${url}`, {
        ...options,
        headers,
      })

      if (response.status === 401) {
        throw new Error('Session expired. Please login again.')
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Request failed')
      }

      return await response.json()
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
      throw error
    }
  }

  const getTasks = async () => {
  try {
    const data = await fetchWithAuth('/tasks');
    if (!Array.isArray(data)) {
      throw new Error('Invalid tasks data format');
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    toast.error('Failed to load tasks');
    return [];
  }
};

  const getUsers = async () => {
    const data = await fetchWithAuth('/users')
	// console.log(data)
    return data || ['lala']
  }

  const createTask = async (taskData) => {
    const data = await fetchWithAuth('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    })
    return data
  }

  const updateTask = async (id, taskData) => {
    const data = await fetchWithAuth(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    })
    return data
  }

  const deleteTask = async (id) => {
    await fetchWithAuth(`/tasks/${id}`, {
      method: 'DELETE',
    })
    return id
  }

  return {
    getTasks,
    getUsers,
    createTask,
    updateTask,
    deleteTask,
  }
}

export default useApi