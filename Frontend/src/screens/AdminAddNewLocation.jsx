import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLocation } from "../service/admin";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function AddLocation() {
    const [landmark, setLandmark] = useState('');
    const [street, setStreet] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

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

    const navigate = useNavigate();

    const onAdd = async () => {
        // Null checking 
        if (!landmark || !street || !area || !city || !state || !zipCode) {
            toast.warning('Please fill in all fields.');
            return;
        }

        
        if (zipCode.length !== 6) {
            toast.warning('Zip Code should be exactly 6 digits.');
            return;
        }

        try {
            const result = await addLocation(landmark, street, area, city, state, zipCode);
            if (result.status === 201) {
                toast.success('Successfully added new location.');
                navigate('/admin/home'); 
            } else {
                toast.error(result.error || 'Failed to add location. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred while adding the location. Please try again.');
            console.error("Error adding location:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <h2 className="text-xl font-bold mb-4">Add New Location</h2>
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
                    <button onClick={onAdd} className="btn btn-success">
                        Add Location
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}