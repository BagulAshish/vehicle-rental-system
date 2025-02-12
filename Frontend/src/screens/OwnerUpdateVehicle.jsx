import { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import OwnerNavbar from "../components/OwnerNavbar";
import { getVehicleById, updateVehicle } from "../service/owner";
import Footer from "../components/Footer";

export default function UpdateVehicle() {
    const [formData, setFormData] = useState({
        vehicleNo: "",
        rcNo: "",
        model: "",
        make: "",
        description: "",
        mileage: "",
        mfgYear: "",
        cc: "",
        costPerHour: "",
        type: "BIKE", // Default type
    });
    
    const { vid } = useParams();
    const navigate = useNavigate();

    const fetchVehicles = async () => {
        try {
            const result = await getVehicleById(vid);
            console.log(result.data.vehicleNo)
            setFormData(result.data)
        } catch (error) {
            toast.error("Failed to load vehicle details.");
            console.error("Error fetching vehicle:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.vehicleNo || !formData.cc || !formData.model || !formData.make || !formData.costPerHour || !formData.type){
            toast.warning('Please fill in all fields.');
            return;
        }
        
        try {
            await updateVehicle(formData, vid);
            toast.success('Vehicle updated successfully.');
            navigate('/owner/get-all-vehicles');
        } catch (error) {
            toast.error("Failed to update discount. Please try again.");
            console.error("Error updating discount:", error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, [vid]);

    

    return (
        <>
        <OwnerNavbar />
        <div className="min-h-screen d-flex align-items-center justify-content-center position-relative bg-dark">
           
            
            <div className="position-absolute w-100 h-100 bg-image"
                 style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
            </div>

            
            <div className="position-absolute w-100 h-100 bg-dark opacity-50"></div>

            <div className="position-relative bg-white p-4 rounded shadow-lg border border-light" style={{ maxWidth: "600px", width: "90%" }}>
                <h3 className="text-center text-dark fw-bold mb-3">
                    <FaCar className="text-success me-2" /> Add Vehicle
                </h3>

                
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Vehicle Number</label>
                    <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">RC Number</label>
                    <input type="text" name="rcNo" value={formData.rcNo} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Model</label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Make</label>
                    <input type="text" name="make" value={formData.make} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="3"
                              className="form-control border-secondary"></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Mileage</label>
                    <input type="text" name="mileage" value={formData.mileage} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Manufacture Year</label>
                    <input type="number" min={2010} max={2025} name="mfgYear" value={formData.mfgYear} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Engine CC</label>
                    <input type="text" name="cc" value={formData.cc} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Cost Per Hour</label>
                    <input type="text" name="costPerHour" value={formData.costPerHour} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Vehicle Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="form-control border-secondary">
                        <option value="BIKE">Bike</option>
                        <option value="SCOOTY">Scooty</option>
                        <option value="SUV">SUV</option>
                        <option value="SEDAN">Sedan</option>
                        <option value="HATCHBACK">Hatchback</option>
                    </select>
                </div>

                
                <button className="btn btn-success w-100 fw-semibold shadow-sm" onClick={handleSubmit}>
                    Update Vehicle 🚗
                </button>
            </div>
        </div>
        <Footer/>
        </>
    );
}