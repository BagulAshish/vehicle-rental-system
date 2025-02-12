import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCar, FaInfoCircle, FaDollarSign } from "react-icons/fa";
import { getVehicleDetails } from "../service/customer";
import { toast } from "react-toastify";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";

const CustomerInsuranceDetails = () => {

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
            <h2 className="text-center mb-4">Insurance Details</h2>
            <div className="card p-4 shadow">
                <h4>Vehicle Details</h4>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Vehicle No:</strong> {vehicle.vehicleNo}</li>
                    <li className="list-group-item"><strong>Model:</strong> {vehicle.model}</li>
                    <li className="list-group-item"><strong>Make:</strong> {vehicle.make}</li>
                    <li className="list-group-item"><strong>Insurance Code:</strong> {vehicle.insurance.insuranceCode}</li>
                    <li className="list-group-item"><strong>Insurance Name:</strong> {vehicle.insurance.insuranceName}</li>
                    <li className="list-group-item"><strong>Insurance Company:</strong> {vehicle.insurance.insuranceCompany}</li>
                    <li className="list-group-item"><strong>Coverage Type:</strong> {vehicle.insurance.coverageType}</li>
                    <li className="list-group-item"><strong>Cost Per Month:</strong> {vehicle.insurance.costPerMonth}</li>
                </ul>

                <button className="btn btn-primary w-100" onClick={navigateBack}>Back</button>
            </div>
            <Footer/>
        </div>
    );
};

export default CustomerInsuranceDetails;
