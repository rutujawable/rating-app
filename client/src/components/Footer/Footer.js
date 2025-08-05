import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer bg-dark text-white mt-5 py-3">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} StoreStars. All rights reserved.</p>
        <small>Made with 💛 for rating stores easily and beautifully.</small>
      </div>
    </footer>
  );
}

export default Footer;
