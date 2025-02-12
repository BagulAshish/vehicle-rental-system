import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css"; 

export default function Footer() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
    <br/><br/><br/>
    <footer className={`footer ${darkMode ? "dark-mode" : ""}`}>
      
      <div className="footer-container">
       
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/available-cities">Available Cities</Link></li>
            <li><Link to="/heading-outstations">Heading Outstations?</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h3>Policies</h3>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/rental-agreement">Rental Agreement</Link></li>
            <li><Link to="/refund-cancellation">Refund & Cancellation</Link></li>
            <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
            <li><Link to="/damage-penalties">Damage Penalties</Link></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📍 Address: 123 Wheels On Demand, Pune, India.</p>
          <p>📧 Email: <a href="mailto:support@wheelsondemand.com">support@wheelsondemand.com</a></p>
          <p>📞 Phone: <a href="tel:+1234567890">+91 00000 99999</a></p>
        </div>
      </div>


      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Car Rental. All Rights Reserved.</p>
      </div>
    </footer>
    </>
  );
}
