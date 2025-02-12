import React, { useState, useEffect } from "react";
import { getOrdersOfOwner } from "../service/owner";
import OwnerNavbar from "../components/OwnerNavbar";
import Footer from "../components/Footer";

const OwnerOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const result = await getOrdersOfOwner()
    if (result.status === 201){
        console.log(result.data)
        setOrders(result.data)
    }
  }

  useEffect(() => {
    // Fetch orders from the database
    fetchOrders()
  }, []);

  
    
  

  return (
    <>
    <OwnerNavbar/>
    <div style={{ padding: "20px" }}>
        
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>My Orders</h1>
      <div style={{ display: "grid", gap: "16px" }}>
        {orders.map((order) => (
          <div 
            key={order.id} 
            style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
            <p><strong>Vehicle No:</strong> {order.vehicle.vehicleNo}</p>
            <p><strong>Make:</strong> {order.vehicle.make}</p>
            <p><strong>Model:</strong> {order.vehicle.model}</p>
            <p><strong>Rent Hours:</strong> {order.billing.rentHours}</p>
            <p><strong>Total Rent:</strong> {order.billing.totalRentAmount}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OwnerOrders;
