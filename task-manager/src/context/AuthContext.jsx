// import { createContext, useContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
// 	console.log('----------')
//     setLoading(false)
//   }, [])

//   const login = async (username, password) => {
//     try {
// 		console.log('--------- 1 ---------')
// 		const response = await fetch('https://recruter-backend.vercel.app/api/login', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ username, password }),
// 		})
		
// 		if (!response.ok) {
// 			throw new Error('Login failed')
// 		}
		
// 		const data = await response.json()
// 		console.log(data)
//       if (!data.success) {
//         throw new Error('Login failed')
//       }

//       const userData = {
//         token: data.user.token,
//         username: data.user.username,
//         firstName: data.user.firstName,
//         lastName: data.user.lastName,
//         role: data.user.role,
//       }

//       localStorage.setItem('user', JSON.stringify(userData))
//       setUser(userData)
//       navigate('/tasks')
//       toast.success('Login successful')
//     } catch (error) {
//       toast.error(error.message || 'Login failed')
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//     navigate('/login')
//     toast.success('Logged out successfully')
//   }

//   const isAdmin = () => {
//     return user?.role === 'admin'
//   }

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, login, logout, isAdmin }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)


import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch('https://recruter-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || 'Login failed')
      }

      const userData = {
        token: data.user.token,
        username: data.user.username,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: data.user.role,
      }

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      navigate('/tasks')
      toast.success('Login successful')
      return true
    } catch (error) {
      toast.error(error.message || 'Login failed')
      return false
    }
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
    toast.success('Logged out successfully')
  }, [navigate])

  const isAdmin = useCallback(() => {
    return user?.role === 'admin'
  }, [user])

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)