import React from "react";

function DemoCredentials({ setEmail, setPassword }) {
  const handleQuickLogin = (role) => {
    if (role === "admin") {
      setEmail("rutujaadmin0@gmail.com");
      setPassword("Admin@123");
    } else if (role === "owner") {
      setEmail("rutujaowner0@gmail.com");
      setPassword("Owner@123");
    } 
  };

  return (
    <div className="demo-credentials mt-4 p-3 rounded shadow-sm">
      <h6 className="fw-bold text-center mb-3">Demo Login</h6>
      <div className="d-flex flex-column gap-2">
        <button
          type="button"
          className="btn btn-outline-primary w-100"
          onClick={() => handleQuickLogin("admin")}
        >
          Login as Admin
        </button>
        <button
          type="button"
          className="btn btn-outline-success w-100"
          onClick={() => handleQuickLogin("owner")}
        >
          Login as Store Owner
        </button>
       
      </div>
    </div>
  );
}

export default DemoCredentials;
