import { useEffect, useState } from "react";
import { getAllCustomers, getAllOwners, getAllVehicles } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import { deleteVehicle, getVehiclesOfOwner } from "../service/owner";
import OwnerNavbar from "../components/OwnerNavbar";
import Footer from "../components/Footer";

export default function OwnerVehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    const fetchVehicles = async () => {
        
            const result = await getVehiclesOfOwner();
            
            if (result.status === 200){
                setVehicles(result.data);
            } else {
                console.log(result.error)
            }
        
    };

    const handleUpdate = (vid) => {
            navigate(`/owner/update-vehicle/${vid}`);
        };
    
        const handleDelete = async (vid) => {
            if (window.confirm("Are you sure you want to delete this vehicle?")) {
                try {
                    await deleteVehicle(vid);
                    toast.success("Vehicle deleted successfully.");
                    fetchVehicles(); // Refresh the list 
                } catch (error) {
                    toast.error("Failed to delete vehicle. Please try again.");
                    console.error("Error deleting vehicle:", error);
                }
            }
        };

    useEffect(() => {
       
        fetchVehicles();
    }, [vehicles.pathname]);

    return (
        <>
        
        
        <div style={{backgroundColor : "black", color: "white", height: "1000px"}}>
        <OwnerNavbar/>
            <div className="container mt-4">
                <h2 className="text-xl font-bold mb-4" style={{color: "white"}}>Vehicles List</h2>
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
                            <th>CC</th>
                            <th colSpan={2}>Actions</th>
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
                                    <td>{vehicle.cc}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleUpdate(vehicle.id)}
                                        >
                                            Update
                                        </button>
                                    </td><td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(vehicle.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
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
        </div>
        <Footer/>
        </>
    );
}