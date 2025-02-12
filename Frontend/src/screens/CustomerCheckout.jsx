import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBillDetails, cancelOrder } from "../service/customer"; // API calls
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";

const Bill = () => {
    const [bill, setBill] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBill = async () => {
            try {
                const response = await getBillDetails();
                if (response.status === 201) {
                    console.log(response.data)
                    setBill(response.data);
                    localStorage.setItem('bid', response.data.id)
                } else {
                    toast.error("Failed to fetch bill details");
                }
            } catch (error) {
                toast.error("Error fetching bill details");
            }
        };
        fetchBill();
    }, []);

    const handleProceedToPayment = () => {
        navigate("/customer/payment");
    };

    const handleCancelOrder = async () => {
        if (!bill) return;
        try {
            const response = await cancelOrder(bill.order.id);
            if (response.status === 201) {
                toast.success("Order canceled successfully");
                navigate("/customer/home");
            } else {
                toast.error("Failed to cancel order");
            }
        } catch (error) {
            toast.error("Error canceling order");
        }
    };

    if (!bill) {
        return <div className="text-center mt-5">Loading bill details...</div>;
    }

    return (
        <div className="container mt-5">
            <CustomerNavbar />
            <h2 className="text-center mb-4">Bill Details</h2>
            <div className="card p-4 shadow">
                <h4>Order Information</h4>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Order ID:</strong> {bill.order.id}</li>
                    <li className="list-group-item"><strong>Bill Date:</strong> {bill.billDate}</li>
                    <li className="list-group-item"><strong>Pick-Up Date:</strong> {bill.order.pickUpTime}</li>
                    <li className="list-group-item"><strong>Drop-Off Date:</strong> {bill.order.dropTime}</li>
                    <li className="list-group-item"><strong>Customer:</strong> {bill.customer.firstName} {bill.customer.lastName}</li>
                </ul>

                <h4 className="mt-4">Vehicle Details</h4>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Vehicle No:</strong> {bill.vehicle.vehicleNo}</li>
                    <li className="list-group-item"><strong>Model:</strong> {bill.vehicle.model}</li>
                    <li className="list-group-item"><strong>Make:</strong> {bill.vehicle.make}</li>
                </ul>

                <h4 className="mt-4">Location Details</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Pick-Up Location:</strong> {bill.order.pickUpLocation.landmark}, {bill.order.pickUpLocation.street}, {bill.order.pickUpLocation.area}, {bill.order.pickUpLocation.city}, {bill.order.pickUpLocation.state}, {bill.order.pickUpLocation.zipcode}
                    </li>
                    <li className="list-group-item">
                        <strong>Drop-Off Location:</strong> {bill.order.dropLocation.landmark}, {bill.order.dropLocation.street}, {bill.order.dropLocation.area}, {bill.order.dropLocation.city}, {bill.order.dropLocation.state}, {bill.order.dropLocation.zipcode}
                    </li>
                </ul>

                <h4 className="mt-4">Billing Summary</h4>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Rent Hours:</strong> {bill.rentHours}</li>
                    <li className="list-group-item"><strong>Total Rent Amount:</strong> ₹{bill.totalRentAmount}</li>
                    <li className="list-group-item"><strong>Tax (18%):</strong> ₹{(bill.totalRentAmount * 0.18).toFixed(2)}</li>
                    <li className="list-group-item"><strong>Discount Applied:</strong> {bill.discount.percentage}%</li>
                    <li className="list-group-item"><strong>Total Amount:</strong> ₹{bill.totalAmount}</li>
                </ul>

                <div className="mt-4 d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={handleCancelOrder}>Cancel Order</button>
                    <button className="btn btn-success" onClick={handleProceedToPayment}>Proceed to Payment</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Bill;
