import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.js';
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin.js';
import DashboardOwner from './pages/DashboardOwner/DashboardOwner.js';
import DashboardUser from './pages/DashboardUser/DashboardUser.js';


const ProtectedRoute = ({ element: Component, role }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (!token || (role && userRole !== role)) {
      navigate('/');
    }
  }, [navigate, role]);
  return <Component />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/admin" element={<ProtectedRoute element={DashboardAdmin} role="admin" />} />
        <Route path="/dashboard/user" element={<ProtectedRoute element={DashboardUser} role="user" />} />
        <Route path="/dashboard/owner" element={<ProtectedRoute element={DashboardOwner} role="owner" />} />
      </Routes>
    </Router>
  );
}

export default App;
