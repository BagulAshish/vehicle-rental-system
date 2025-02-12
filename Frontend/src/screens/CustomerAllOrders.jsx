import React, { useState, useEffect } from "react";
import { completeOrder, getOrdersOfCustomer } from "../service/customer";
import { toast } from "react-toastify";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState(new Set());

  const fetchOrders = async () => {
    const result = await getOrdersOfCustomer()
    if (result.status === 201){
        console.log(result.data)
        setOrders(result.data)
    }
  }

  useEffect(() => {
    
    fetchOrders()
  }, []);

  const handleComplete = async (orderId) => {
    try{
        const result = await completeOrder(orderId)
        if (result.status === 201){
            toast.success('Order completed successfully')
        }
    } catch (ex) {
        console.log(ex)
    }
    
  };

  return (
    <>
    <CustomerNavbar/>
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
            {!completedOrders.has(order.id) && (
              <button 
                onClick={() => handleComplete(order.id)}
                style={{ marginTop: "8px", backgroundColor: "#007bff", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CustomerOrders;
