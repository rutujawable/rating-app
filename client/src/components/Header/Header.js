import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLoggedIn = localStorage.getItem('token');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    
    setAnimate(true);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top shadow header ${animate ? "slide-down" : ""}`}>
      <Link className="d-flex align-items-center text-decoration-none brand" to="/">
        <i className="bi bi-star-fill fs-3 text-warning me-2"></i>
        <i className="bi bi-shop fs-3 text-info me-2"></i>
        <span className="fw-bold fs-4 text-light">StoreStars</span>
      </Link>
      <div className="ms-auto">
        {isLoggedIn ? (
          <>
            <span className="text-light me-3 text-capitalize">{role} panel</span>
            <button onClick={handleLogout} className="btn-glow btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link className="btn-glow btn-sm me-2" to="/">Login</Link>
            <Link className="btn-glow btn-sm success" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
