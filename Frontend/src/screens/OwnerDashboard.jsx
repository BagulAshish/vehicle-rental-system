import "../css/AdminDashboard.css"; // Import the CSS file
import Navbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../css/Home.css"
import OwnerNavbar from "../components/OwnerNavbar";
import Footer from "../components/Footer";

export default function OwnerDashboard() {

  const token = sessionStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const sub = decodedToken.sub

  const navigate = useNavigate()
  const navigateToAddNewVehicle = () => {
    navigate('/owner/add-vehicle');
  }
  const navigateToGetAllVehicles = () => {
    navigate('/owner/get-all-vehicles')
  }

  return (
    <div className="OwnerHome">
      <OwnerNavbar/>
      <br/>
      
      <header className="dashboard-header">
        <h1 style={{color: "white", justifyContent: "center"}}>Hello {sub}!</h1>
      </header>

      
      <div className="dashboard-grid">
        
        <div className="dashboard-card" onClick={navigateToAddNewVehicle}>
          <h2>Add New Vehicle</h2>
          <p>Add a new vehicle</p>
        </div>

        
        <div className="dashboard-card" onClick={navigateToGetAllVehicles}>
          <h2>Vehicles</h2>
          <p>Manage registered Vehicles</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
