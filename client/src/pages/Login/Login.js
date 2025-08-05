import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api.js';
import "./../../styles/AuthForm.css"
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('role', res.data.user.role);

      const role = res.data.user.role;
      alert('Login successful!');
      if (role === 'admin') navigate('/dashboard/admin');
      else if (role === 'owner') navigate('/dashboard/owner');
      else navigate('/dashboard/user');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className="auth-wrapper">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
              <i
                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <button className="btn btn-primary w-100 mt-3">Login</button>
          </form>

          <p className="mt-3 text-center">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
