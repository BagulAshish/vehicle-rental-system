import { useEffect, useState } from "react";
import { getAllCustomers, getAllOwners, getAllVehicles } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    const fetchVehicles = async () => {
        
            const result = await getAllVehicles();
            if (result.status === 201){
                setVehicles(result.data);
            } else {
                console.log(result.error)
            }
        
    };

    useEffect(() => {
       
        fetchVehicles();
    }, [vehicles.pathname]);

    return (
        <div style={{backgroundColor : "black", color: "white", height: "1000px"}}>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-xl font-bold mb-4" style={{color: "white"}}>Customers List</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Vehicle Add Date</th>
                            <th>Vehicle No</th>
                            <th>RC No</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Cost Per Hour</th>
                            <th>Type</th>
                            <th>Owner First Name</th>
                            <th>Owner Last Name</th>
                            <th>Owner Email Id</th>
                            <th>Owner City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.length > 0 ? (
                            vehicles.map((vehicle) => (
                                <tr key={vehicle.id}>
                                    <td>{vehicle.id}</td>
                                    <td>{vehicle.createdOn}</td>
                                    <td>{vehicle.vehicleNo}</td>
                                    <td>{vehicle.rc}</td>
                                    <td>{vehicle.make}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.costPerHour}</td>
                                    <td>{vehicle.type}</td>
                                    <td>{vehicle.owner.firstName}</td>
                                    <td>{vehicle.owner.lastName}</td>
                                    <td>{vehicle.owner.email}</td>
                                    <td>{vehicle.owner.address.city}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No vehicles found.
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