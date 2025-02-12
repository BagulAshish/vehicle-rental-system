import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCar, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { getVehicleDetails } from "../service/customer";
import { toast } from "react-toastify";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";

const CustomerOwnerDetails = () => {

    const [vehicle, setVehicle] = useState('');

    const fetchDetails = async () => {
        const vid = localStorage.getItem('vid');
        const result = await getVehicleDetails(vid);
        if (result.status === 201) {
            setVehicle(result.data);
        } else {
            toast.error("Error in fetching vehicle details");
        }
    }

    const navigate = useNavigate()
    
    const navigateBack = () => {
        navigate('/customer/vehicle-details')
    }

    useEffect(() => {
        fetchDetails(); 
    }, []); 

    if (!vehicle) {
        return <div className="text-center text-white p-5">No vehicle selected.</div>;
    }

    return (
        <div className="container mt-5">
            <CustomerNavbar/>
            <h2 className="text-center mb-4">Owner Details</h2>
            <div className="card p-4 shadow">
                <h4>Owner Details</h4>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Vehicle No:</strong> {vehicle.vehicleNo}</li>
                    <li className="list-group-item"><strong>Model:</strong> {vehicle.model}</li>
                    <li className="list-group-item"><strong>Make:</strong> {vehicle.make}</li>
                    <li className="list-group-item"><strong>Owner Name:</strong> {vehicle.owner.firstName} {vehicle.owner.lastName}</li>
                    <li className="list-group-item"><strong>Owner Email:</strong> {vehicle.owner.email}</li>
                    <li className="list-group-item"><strong>Owner Mobile No:</strong> {vehicle.owner.mobileNo}</li>
                    <li className="list-group-item"><strong>Owner City:</strong> {vehicle.owner.address.city}</li>
                </ul>

                <button className="btn btn-primary w-100" onClick={navigateBack}>Back</button>
            </div>
            <Footer/>
        </div>
    );
};

export default CustomerOwnerDetails;
