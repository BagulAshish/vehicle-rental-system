import "../css/AdminDashboard.css"; // Import the CSS file
import Navbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import OwnerNavbar from "../components/OwnerNavbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function AdminDashboard() {

  const token = sessionStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const sub = decodedToken.sub

  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate()
  const navigateToGetAll = () => {
    navigate('/admin/get-all-locations');
  }
  const navigateToAdd = () => {
    navigate('/admin/add-location')
  }
  const navigateToAddDiscount = () => {
    navigate('/admin/add-discount')
  }
  const navigateToAddAdmin = () => {
    navigate('/admin/add-new-admin')
  }
  const navigateToGetAllDis = () => {
    navigate('/admin/get-all-discounts')
  }
  const navigateToGetAllOwners = () => {
    navigate('/admin/get-all-owners')
  }
  const navigateToGetAllCustomers = () => {
    navigate('/admin/get-all-customers')
  }
  const navigateToGetAllVehicles = () => {
    navigate('/admin/get-all-vehicles')
  }
  const navigateToGetAllOrders = () => {
    navigate('/admin/get-all-orders')
  }

  return (
    
    <div className="dashboard">
      <OwnerNavbar/>
      <br/>
      
      <header className="dashboard-header">
        <h1>Hello {sub}!</h1>
      </header>

     
      <div className="dashboard-grid">
        
        <div className="dashboard-card" onClick={navigateToGetAllCustomers}>
          <h2>Customers</h2>
          <p>View all customers</p>
        </div>

        
        <div className="dashboard-card" onClick={navigateToGetAllOwners}>
          <h2>Owners</h2>
          <p>View all owners</p>
        </div>

        
        <div className="dashboard-card" onClick={navigateToGetAllVehicles}>
          <h2>Vehicles</h2>
          <p>Manage registered Vehicles</p>
        </div>

        
        <div className="dashboard-card" onClick={navigateToGetAllOrders}>
          <h2>Orders</h2>
          <p>View and manage orders</p>
        </div>

        
        <div className="dashboard-card"  onClick={navigateToGetAll}>
          <h2>Locations</h2>
          <p>Get list of all locations</p>
        </div>

        <div className="dashboard-card"  onClick={navigateToGetAllDis}>
          <h2>Discounts</h2>
          <p>Get list of all discounts</p>
        </div>

        
        <div className="dashboard-card" onClick={navigateToAdd}>
          <h2>Add New Location</h2>
          <p>Add new location for orders</p>
        </div>

        <div className="dashboard-card" onClick={navigateToAddAdmin}>
          <h2>Add New Admin</h2>
          <p>Register new admin</p>
        </div>

        <div className="dashboard-card" onClick={navigateToAddDiscount}>
          <h2>Add New Discount</h2>
          <p>Create a new offer</p>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}
