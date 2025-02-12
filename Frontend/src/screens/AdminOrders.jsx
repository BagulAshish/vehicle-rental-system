import { useEffect, useState } from "react";
import { getAllOrder } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function GetAllOrders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const result = await getAllOrder();
            console.log(result)
            setOrders(result.data);
        } catch (error) {
            toast.error("Failed to load orders. Please try again.");
            console.error("Error fetching orders:", error);
        }
    };

    

    

    useEffect(() => {
       
        fetchOrders();
    }, [orders.pathname]);

    return (
        <div style={{backgroundColor : "black", color: "white", height: "1000px"}}>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-xl font-bold mb-4" style={{color: "white"}}>Orders List</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Order Time</th>
                            <th>Customer</th>
                            <th>Vehicle No</th>
                            <th>Vehicle</th>
                            <th>Owner</th>
                            <th>Pick Up Time</th>
                            <th>Drop Time</th>
                            <th>Pick Up City</th>
                            <th>Drop City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.createdOn}</td>
                                    <td>{order.customer.firstName} {order.customer.lastName}</td>
                                    <td>{order.vehicle.vehicleNo}</td>
                                    <td>{order.vehicle.make} {order.vehicle.model}</td>
                                    
                                    <td>{order.owner.username}</td>
                                    <td>{order.pickUpTime}</td>
                                    <td>{order.dropTime}</td>
                                    <td>{order.pickUpLocation.city}</td>
                                    <td>{order.dropLocation.city}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    );
}