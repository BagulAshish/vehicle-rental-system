import { useEffect, useState } from "react";
import { getDiscountById, getLocationById, updateDiscount, updateLocation } from "../service/admin";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function UpdateDiscount() {
    const [discountCode, setDiscountCode] = useState('')
    const [discountName, setDiscountName] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [percentage, setPercentage] = useState('')

    const { did } = useParams();
    
    
    
    
    const navigate = useNavigate();

    const fetchDiscount = async () => {
        try {
            const result = await getDiscountById(did);
            setDiscountCode(result.data.discountCode)
            setDiscountName(result.data.discountName)
            setExpiryDate(result.data.expiryDate)
            setPercentage(result.data.percentage)
        } catch (error) {
            toast.error("Failed to load location details.");
            console.error("Error fetching location:", error);
        }
    };

    const handleUpdate = async () => {
        if (!discountCode || !discountName || !expiryDate || !percentage) {
            toast.warning('Please fill in all fields.');
            return;
        }
        if (expiryDate.toString() < '2025-02-01'){
            toast.warning('Expiry date should be valid')
            return;
        }
        if (percentage <= 0 || percentage > 100){
            toast.warning('Add a valid percentage.');
            return;
        }


        try {
            await updateDiscount(did, discountCode, discountName, expiryDate, percentage);
            toast.success('Discount updated successfully.');
            navigate('/admin/get-all-discounts');
        } catch (error) {
            toast.error("Failed to update location. Please try again.");
            console.error("Error updating location:", error);
        }
    };

    useEffect(() => {
        fetchDiscount();
    }, [did]);

    return (
        <div>
            <Navbar />
            <br/>
            <h2 className="text-xl font-bold mb-4">Add New Discount</h2>
            <div className="container mx-auto">
                <div className="justify-content-centre">
                    <div className="col-md-4">
                        <label htmlFor="discountCode">Discount Code</label>
                        <input
                            type="text"
                            name="discountCode"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="discountName">Discount Name</label>
                        <input
                            type="text"
                            name="discountName"
                            value={discountName}
                            onChange={(e) => setDiscountName(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="percentage">Percentage</label>
                        <input
                            type="number"
                            name="percentage"
                            value={percentage}
                            min={1}
                            max={100}
                            onChange={(e) => setPercentage(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <br/>
                    <div className="col-md-4">
                    <button onClick={handleUpdate} className="btn btn-success">
                        Update Discount
                    </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}