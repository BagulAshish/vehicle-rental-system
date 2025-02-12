import { useState } from "react";
import { addDiscount } from "../service/admin";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function AddNewDiscount() {

    const [discountCode, setDiscountCode] = useState('')
    const [discountName, setDiscountName] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [percentage, setPercentage] = useState('')

    const navigate = useNavigate()

    const onAdd = () => {
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
        const result = addDiscount(discountCode, discountName, expiryDate, percentage)
        toast.success('Discount added successfully')
        navigate('/admin/home')
        
    }

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
                    <button onClick={onAdd} className="btn btn-success">
                        Add Discount
                    </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}