import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api.js';
import "./../../styles/AuthForm.css"
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (form.name.length < 20 || form.name.length > 60)
      errs.name = 'Name must be 20–60 characters.';
    if (!emailRegex.test(form.email))
      errs.email = 'Please enter a valid email address.';
    if (form.address.length > 400)
      errs.address = 'Address too long.';
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16}$)/.test(form.password))
      errs.password = 'Password must be 8–16 chars, 1 uppercase, 1 special.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      await API.post('/signup', form);
      alert('Signup successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
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
          <h2 className="form-title">Create Account</h2>
          <form onSubmit={handleSubmit} noValidate>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your Full Name"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your Email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your Address"
            />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Password"
              />
              <i
                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-control mt-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button className="btn btn-success w-100 mt-3">Sign Up</button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
