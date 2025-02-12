import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { getLocations, getVehicleDetails, placeOrder } from "../service/customer";
import { toast } from "react-toastify";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";

const VehicleDetails = () => {
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState('');
    const [pickUpDate, setPickUpDate] = useState('');
    const [dropDate, setDropDate] = useState('');
    const [locations, setLocations] = useState([]);
    const [pickUpLocation, setPickUpLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');

    const fetchDetails = async () => {
        const vid = localStorage.getItem('vid');
        const result = await getVehicleDetails(vid);
        console.log(result.data)
        if (result.status === 201) {
            setVehicle(result.data);
        } else {
            toast.error("Error in fetching vehicle details");
        }
    };

    const fetchLocations = async () => {
        try {
            const result = await getLocations(); // Fetch locations from backend
            if (result.status === 201) {
                setLocations(result.data);
            } else {
                toast.error("Error fetching locations");
            }
        } catch (error) {
            toast.error("Error fetching locations");
        }
    };

    const handleBooking = async () => {
        if (!pickUpLocation || !dropLocation) {
            toast.error("Please select both pick-up and drop-off locations");
            return;
        }
        if (!pickUpDate || !dropDate) {
            toast.error("Please select both pick-up and drop-off dates");
            return;
        }

        const pickUpDateTime = `${pickUpDate}:00`;
        const dropDateTime = `${dropDate}:00`;
        const result = await placeOrder(pickUpLocation, dropLocation, pickUpDateTime, dropDateTime)
        console.log(result)
        console.log(result.data)
        if (result.status === 201){
            toast.success('Order placed successfully')
            localStorage.setItem('orid', result.data)
            navigate('/customer/select-discount')
        }
    };

    const getInsuranceDetails = () => {
        navigate('/customer/get-insurance-details');
    };

    const getOwnerDetails = () => {
        navigate('/customer/get-owner-details');
    };

    useEffect(() => {
        fetchDetails();
        fetchLocations();
    }, []);

    if (!vehicle) {
        return <div className="text-center text-white p-5">No vehicle selected.</div>;
    }

    return (
        <div className="container mt-5">
            <CustomerNavbar/>
            <h2 className="text-center mb-4">Confirm Your Booking</h2>
            <div className="card p-4 shadow">
                <h4>Vehicle Details</h4>
                <ul className="list-group">
                    <li className="list-group-item"><strong>Vehicle No:</strong> {vehicle.vehicleNo}</li>
                    <li className="list-group-item"><strong>Model:</strong> {vehicle.model}</li>
                    <li className="list-group-item"><strong>Make:</strong> {vehicle.make}</li>
                    <li className="list-group-item"><strong>Description:</strong> {vehicle.description}</li>
                    <li className="list-group-item"><strong>CC:</strong> {vehicle.cc}</li>
                    <li className="list-group-item"><strong>Mileage:</strong> {vehicle.mileage} km/l</li>
                    <li className="list-group-item"><strong>Manufacturing Year:</strong> {vehicle.mfgYear}</li>
                    <li className="list-group-item"><strong>Cost Per Hour:</strong> ₹{vehicle.costPerHour}</li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>Insurance Name:</strong> {vehicle.insurance.insuranceName}</span>
                        <button className="btn btn-primary" onClick={getInsuranceDetails}>Get Insurance Details</button>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>Owner:</strong> {vehicle.owner.username}</span>
                        <button className="btn btn-primary" onClick={getOwnerDetails}>Get Owner Details</button>
                    </li>
                </ul>

                <h4 className="mt-4">Select Booking Details</h4>

                
                <div className="mb-3">
                    <label className="form-label"><strong>Pick-Up Location:</strong></label>
                    <select
                        className="form-control"
                        value={pickUpLocation}
                        onChange={(e) => setPickUpLocation(e.target.value)}
                        required
                    >
                        <option value="">Select Pick-Up Location</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {`${loc.landmark}, ${loc.street}, ${loc.area}, ${loc.city}, ${loc.state}, ${loc.zipCode}`}
                            </option>
                        ))}
                    </select>
                </div>

                
                <div className="mb-3">
                    <label className="form-label"><strong>Drop-Off Location:</strong></label>
                    <select
                        className="form-control"
                        value={dropLocation}
                        onChange={(e) => setDropLocation(e.target.value)}
                        required
                    >
                        <option value="">Select Drop-Off Location</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {`${loc.landmark}, ${loc.street}, ${loc.area}, ${loc.city}, ${loc.state}, ${loc.zipCode}`}
                            </option>
                        ))}
                    </select>
                </div>

                
                <div className="mb-3">
                    <label className="form-label"><strong>Pick-Up Date:</strong></label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={pickUpDate}
                        onChange={(e) => setPickUpDate(e.target.value)}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label className="form-label"><strong>Drop-Off Date:</strong></label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={dropDate}
                        onChange={(e) => setDropDate(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={handleBooking}>Rent Now</button>
            </div>
            <Footer/>
        </div>
    );
};

export default VehicleDetails;
