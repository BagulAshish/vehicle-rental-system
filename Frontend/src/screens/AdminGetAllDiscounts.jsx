import { useEffect, useState } from "react";
import { deleteDiscount, deleteLocation, getAllDiscounts, getAllLocations } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function GetAllDiscounts() {
    const [discounts, setDiscounts] = useState([]);
    const navigate = useNavigate();

    const fetchDiscounts = async () => {
        try {
            const result = await getAllDiscounts();
            setDiscounts(result);
        } catch (error) {
            toast.error("Failed to load locations. Please try again.");
            console.error("Error fetching locations:", error);
        }
    };

    const handleUpdate = (did) => {
        navigate(`/admin/update-discount-by-id/${did}`);
    };

    const handleDelete = async (did) => {
        if (window.confirm("Are you sure you want to delete this discount?")) {
            try {
                const result = await deleteDiscount(did);
                toast.success("Discount deleted successfully.");
                fetchDiscounts(); // Refresh the list after deletion
            } catch (error) {
                toast.error("Failed to delete discount. Please try again.");
                console.error("Error deleting discount:", error);
            }
        }
    };

    useEffect(() => {
       
        fetchDiscounts();
    }, [discounts.pathname]);

    return (
        <div style={{backgroundColor : "black", color: "white", height: "1000px"}}>
            <Navbar />
            <br/>
            <div className="container mt-4">
                <h2 className="text-xl font-bold mb-4" style={{color: "white"}}>Discount List</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Discount Added On</th>
                            <th>Discount Code</th>
                            <th>Discount Name</th>
                            <th>Expiry Date</th>
                            <th>Percentage</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.length > 0 ? (
                            discounts.map((discount) => (
                                <tr key={discount.id}>
                                    <td>{discount.id}</td>
                                    <td>{discount.createdOn}</td>
                                    <td>{discount.discountCode}</td>
                                    <td>{discount.discountName}</td>
                                    <td>{discount.expiryDate}</td>
                                    <td>{discount.percentage}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleUpdate(discount.id)}
                                        >
                                            Update
                                        </button>
                                    </td><td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(discount.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No discount found.
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