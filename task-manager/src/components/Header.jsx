// import { useAuthStore } from '../stores/authStore'

// export default function Header() {
//   const { user, logout } = useAuthStore((state) => ({
//     user: state.user,
//     logout: state.logout
//   }))

//   return (
//     <header className="header">
//       <img src="/logo.png" alt="Logo" className="logo" />
//       <div className="avatar">
//         {user?.username}
//         <button onClick={logout}>Logout</button>
//       </div>
//     </header>
//   )
// }

import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'
import './Header.css'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Company Logo" height="40" />
        </div>

        {user && (
          <div className="user-info">
            <span className="user-name">
              {user.firstName} {user.lastName}
            </span>
            <button className="avatar" onClick={logout}>
              {user.firstName.charAt(0).toUpperCase()}
            </button>
          </div>
        )}
		
      </div>
    </header>
  )
}

export default Header