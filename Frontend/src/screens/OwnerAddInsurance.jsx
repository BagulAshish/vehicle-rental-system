import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCar, FaFileImage, FaFile } from "react-icons/fa";
import { addNewInsurance, addNewVehicle } from "../service/owner";
import OwnerNavbar from "../components/OwnerNavbar";
import Footer from "../components/Footer";

function AddInsurance() {
    const [formData, setFormData] = useState({
        insuranceCode: "",
        insuranceName: "",
        insuranceCompany: "",
        coverageType: "ThirdPartyLiability",
        costPerMonth: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.insuranceCode || !formData.insuranceCompany || !formData.insuranceName || !formData.costPerMonth || !formData.coverageType) {
            toast.warning("Place all details");
            return;
        }
        console.log(formData.coverageType)
        const result = await addNewInsurance(formData.insuranceCode, formData.insuranceName, formData.insuranceCompany, formData.coverageType, formData.costPerMonth)
        if (result.status === 201){
            toast.success("Insurance added successfully!");
            localStorage.removeItem('vid')
            navigate('/owner/home')
        }else {
            console.log(result.error)
        }
        
    };

    return (
        <>
        <OwnerNavbar/>
        
        <div className="min-h-screen d-flex align-items-center justify-content-center position-relative bg-dark">
           
            <div className="position-absolute w-100 h-100 bg-image"
                 style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?luxury-car,showroom')", backgroundSize: "cover", backgroundPosition: "center" }}>
            </div>

            
            <div className="position-absolute w-100 h-100 bg-dark opacity-50"></div>

            
            <div className="position-relative bg-white p-4 rounded shadow-lg border border-light" style={{ maxWidth: "600px", width: "90%" }}>
                <h3 className="text-center text-dark fw-bold mb-3">
                    <FaCar className="text-success me-2" /> Add Insurance To The Vehicle
                </h3>

                
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Insurance Code</label>
                    <input type="text" name="insuranceCode" value={formData.insuranceCode} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Insurance Name</label>
                    <input type="text" name="insuranceName" value={formData.insuranceName} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Insurance Company</label>
                    <input type="text" name="insuranceCompany" value={formData.insuranceCompany} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Coverage Type</label>
                    <select name="coverageType" value={formData.coverageType} onChange={handleChange} className="form-control border-secondary">
                        <option value="" disabled>Select Coverage Type</option>
                        <option value="ThirdPartyLiability">Third Party Liability</option>
                        <option value="OwnDamage">Own Damage</option>
                        <option value="PersonalAccident">Personal Accident</option>
                        <option value="UninsuredMotorist">Uninsured Motorist</option>
                        <option value="Comprehensive">Comprehensive</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Cost Per Month</label>
                    <input type="text" name="costPerMonth" value={formData.costPerMonth} onChange={handleChange}
                           className="form-control border-secondary" />
                </div>
                
                <button className="btn btn-success w-100 fw-semibold shadow-sm" onClick={handleSubmit}>
                    Add Insurance
                </button>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default AddInsurance;

