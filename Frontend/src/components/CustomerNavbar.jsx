import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminImage } from '../service/admin';

const CustomerNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedTheme = localStorage.getItem("darkMode");
        if (savedTheme) {
          setDarkMode(savedTheme === "true");
        }

        const result2 = await getAdminImage();
        setPhoto(`data:image/jpeg;base64,${result2.data}`);
      } catch (error) {
        console.error("Error fetching admin image:", error);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    sessionStorage.removeItem("token");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Wheels On Demand
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customer/home">
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customer/orders">
                  Your Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customer/home">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={logOut}>
                  Login/Log Out
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={toggleDarkMode}>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="ms-3">
                  {photo ? (
                    <img
                      src={photo}
                      alt="User"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "2px solid white",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <span className="text-light">Loading...</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>
        {`
          body.dark-mode {
            background-color: #121212;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default CustomerNavbar;
