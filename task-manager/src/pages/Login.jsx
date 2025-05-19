// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuthStore } from '../stores/authStore'
// import { toast } from 'react-toastify'

// export default function Login() {
//   const login = useAuthStore((state) => state.login)
//   const navigate = useNavigate()
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await fetch('https://recruter-backend.vercel.app/api/login', {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' },
//       })
//       if (!res.ok) throw new Error('Invalid credentials')
// 		const data = await res.json()
// 	  console.log('----11--------')
// 	console.log('------------')
// 	console.log(data)
//       login(data.user, data.token)
//       navigate('/tasks')
//     } catch (err) {
//       toast.error(err.message)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   )
// }


// /*
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
//   const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      alert('Please enter both username and password')
      return
    }
    await login(username, password)
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

// */



// Login.jsx
// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt with:', { email, password });
//     // Add your authentication logic here
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-logo">
//           <div className="logo-icon">
//             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect width="24" height="24" rx="6" fill="#0080FF" />
//               <path d="M7 12L10.5 15.5L17.5 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </div>
//           <span className="logo-text">Taski</span>
//         </div>

//         <h1 className="login-title">Login</h1>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input 
//               type="email" 
//               id="email" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="leslie@pixsellz.io" 
//               required 
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="password-input">
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 id="password" 
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••••••" 
//                 required 
//               />
//               <button 
//                 type="button"
//                 className="password-toggle" 
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
