import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer animate-footer">
      <div className="footer-container">
        <p className="fade-in">&copy; {new Date().getFullYear()} StoreStars. All rights reserved.</p>
        <small className="slide-up">Made with 💛 for rating stores easily and beautifully.</small>
      </div>
    </footer>
  );
}

export default Footer;
