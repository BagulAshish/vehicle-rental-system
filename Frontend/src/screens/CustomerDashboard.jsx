import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";
import { getAllVehiclesForCustomer } from "../service/customer";


import sedanImg from "../images/vehicles/sedan.jpg";
import hatchbackImg from "../images/vehicles/hatchback.jpg";
import bikeImg from "../images/vehicles/bike.jpg";
import scootyImg from "../images/vehicles/scooty.jpg";
import suvImg from "../images/vehicles/suv.jpg";
import defaultImg from "../images/vehicles/default.jpg"; 

export default function CustomerDashboard() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();


    const vehicleImages = {
        sedan: sedanImg,
        hatchback: hatchbackImg,
        bike: bikeImg,
        scooty: scootyImg,
        suv: suvImg
    };

   
    const fetchVehicles = async () => {
        try {
            const result = await getAllVehiclesForCustomer();
            if (result.status === 201) {
                setVehicles(result.data);
            } else {
                console.log(result.error);
                toast.error("Failed to fetch vehicles.");
            }
        } catch (error) {
            console.log("Error fetching vehicles:", error);
            toast.error("An error occurred while fetching vehicles.");
        }
    };


    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const sub = decodedToken.sub;


    const bookVehicle = (vid) => {
        localStorage.setItem('vid', vid);
        navigate('/customer/vehicle-details');
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    return (
        <>
            <CustomerNavbar />
            <div className="container mt-5">
                <h2 className="text-center fw-bold">Welcome, {sub}! 🚗</h2>
                <p className="text-center text-muted">Choose your vehicle and book now.</p>

              
                <div className="row mt-4">
                    {vehicles.length > 0 ? (
                        vehicles.map((vehicle) => {
                            
                            const vehicleType = vehicle.type.toLowerCase();
                            const vehicleImage = vehicleImages[vehicleType] || defaultImg;

                            return (
                                <div className="col-md-4 mb-4" key={vehicle.id}>
                                    <div className="card shadow-sm">
                                        <img
                                            src={vehicleImage}
                                            alt={`${vehicle.make} ${vehicle.model}`}
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{vehicle.make} {vehicle.model}</h5>
                                            <p className="text-muted">{vehicle.type}</p>
                                            <p className="card-text">{vehicle.description}</p>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Cost Per Hour: <b>₹{vehicle.costPerHour}</b></li>
                                                <li className="list-group-item">Mileage: <b>{vehicle.mileage} km/l</b></li>
                                            </ul>
                                            <button className="btn btn-success w-100 mt-3" onClick={() => bookVehicle(vehicle.id)}>
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center mt-5">
                            <h5 className="text-muted">No vehicles found.</h5>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
