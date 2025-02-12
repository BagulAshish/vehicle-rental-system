import { useEffect, useState } from "react";
import { deleteLocation, getAllLocations } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function GetAllLocations() {
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    const fetchLocations = async () => {
        try {
            const result = await getAllLocations();
            console.log(result)
            setLocations(result);
        } catch (error) {
            toast.error("Failed to load locations. Please try again.");
            console.error("Error fetching locations:", error);
        }
    };

    const handleUpdate = (lid) => {
        navigate(`/admin/update-by-id/${lid}`);
    };

    const handleDelete = async (lid) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            try {
                await deleteLocation(lid);
                toast.success("Location deleted successfully.");
                fetchLocations(); // Refresh the list
            } catch (error) {
                toast.error("Failed to delete location. Please try again.");
                console.error("Error deleting location:", error);
            }
        }
    };

    useEffect(() => {
       
        fetchLocations();
    }, [locations.pathname]);

    return (
        <div style={{backgroundColor : "black", color: "white", height: "1000px"}}>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-xl font-bold mb-4" style={{color: "white"}}>Location List</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Location Added On</th>
                            <th>City</th>
                            <th>Landmark</th>
                            <th>Street</th>
                            <th>Area</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.length > 0 ? (
                            locations.map((location) => (
                                <tr key={location.id}>
                                    <td>{location.id}</td>
                                    <td>{location.createdOn}</td>
                                    <td>{location.city}</td>
                                    <td>{location.landmark}</td>
                                    <td>{location.street}</td>
                                    <td>{location.area}</td>
                                    <td>{location.state}</td>
                                    <td>{location.zipCode}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleUpdate(location.id)}
                                        >
                                            Update
                                        </button>
                                    </td><td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(location.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No locations found.
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