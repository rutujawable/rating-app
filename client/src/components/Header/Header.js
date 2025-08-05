import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top shadow">
      <Link className="d-flex align-items-center text-decoration-none" to="/">
        <i className="bi bi-star-fill fs-3 text-warning me-2"></i>
        <i className="bi bi-shop fs-3 text-primary me-2"></i>
        <span className="fw-bold fs-4 text-white">StoreStars</span>
      </Link>
      <div className="ms-auto">
        {isLoggedIn ? (
          <>
            <span className="text-white me-3 text-capitalize">{role} panel</span>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light btn-sm me-2" to="/">Login</Link>
            <Link className="btn btn-outline-success btn-sm" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
