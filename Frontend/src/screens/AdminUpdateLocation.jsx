import { useEffect, useState } from "react";
import { getLocationById, updateLocation } from "../service/admin";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/AdminNavbar";
import UpdateDiscount from "./AdminUpdateDiscount";
import Footer from "../components/Footer";

export default function UpdateLocation() {
    const [landmark, setLandmark] = useState('');
    const [street, setStreet] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    
    const { lid } = useParams();
    const navigate = useNavigate();

    const statesInIndia = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
    ];

    const fetchLocations = async () => {
        try {
            const result = await getLocationById(lid);
            setLandmark(result.landmark);
            setStreet(result.street);
            setArea(result.area);
            setCity(result.city);
            setState(result.state);
            setZipCode(result.zipCode);
        } catch (error) {
            toast.error("Failed to load location details.");
            console.error("Error fetching location:", error);
        }
    };

    const handleUpdate = async () => {
        if (!landmark || !area || !street || !city || !state || !zipCode){
            toast.warning('Please fill in all fields.');
            return;
        }
        if (zipCode > 6){
            toast.warning('Zip code should be of 6 digits')
            return;
        }
        try {
            await updateLocation(lid, landmark, street, area, city, state, zipCode);
            toast.success('Discount updated successfully.');
            navigate('/admin/get-all-discounts');
        } catch (error) {
            toast.error("Failed to update discount. Please try again.");
            console.error("Error updating discount:", error);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, [lid]);

    return (
        <div>
            <Navbar />
            <h2 className="text-xl font-bold mb-4">Update Location</h2>
            <div className="container mx-auto">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="landmark">Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="street">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="area">Area</label>
                        <input
                            type="text"
                            name="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="state">State</label>
                        <br/>
                        <select id="state" value={state} onChange={(e) => setState(e.target.value)} className="col-md-12">
                            <option value="">--Select State--</option>
                            {statesInIndia.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                            </select>
                            
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="zipCode">Zip Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <button onClick={handleUpdate} className="btn btn-success">
                        Update Location
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}