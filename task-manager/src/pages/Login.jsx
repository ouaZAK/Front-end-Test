import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import '../css/Login.css';
import { useAuth } from '../context/AuthContext'
import checkLogo from '../assets/check.svg'
import { toast } from 'react-toastify'

const Login = () => {
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both username and password')
      return
    }
    await login(email, password)
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">
            <img src={checkLogo} alt="" />
          </div>
          <span className="logo-text">Taski</span>
        </div>


        <form onSubmit={handleSubmit} className="login-form">
        	<h1 className="login-title">Login</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
            //   type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="leslie@pixsellz.io" 
            //   required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                // required 
              />
              <button 
                type="button"
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
