import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import Login from './pages/Login'
import Tasks from './pages/Tasks'

const PrivateRoute = ({ children }) => {
	// console.log("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InoiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDc2NTYwODYsImV4cCI6MTc0Nzc0MjQ4Nn0.udlcZp1h0yBYsM5DIiJcYFTU0-TdlwBDKWpRxJhXSgE")
	
	console.log(children)
  const token = useAuthStore((state) => state.token)
  return token ? children : <Navigate to="/login" />
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </BrowserRouter>
  )
}
