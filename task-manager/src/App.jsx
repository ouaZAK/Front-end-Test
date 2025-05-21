// import Router from './router'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import './index.css'

// export default function App() {
//   return (
//     <>
//       <Router />
//       <ToastContainer />
//     </>
//   )
// }


// import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import Header from './components/Header'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        {/* <Header /> */}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App