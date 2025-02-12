import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAvailableDiscounts } from "../service/customer"; // API call function
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";

const SelectDiscount = () => {
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const result = await getAvailableDiscounts();
                console.log(result)
                if (result.status === 201) {
                    setDiscounts(result.data);
                } else {
                    toast.error("Failed to fetch discounts");
                }
            } catch (error) {
                toast.error("Error fetching discounts");
            }
        };
        fetchDiscounts();
    }, []);

    
    const handleSelectDiscount = (discount) => {
        setSelectedDiscount(discount);
        localStorage.setItem("did", discount.id); 
        toast.success(`Selected Discount: ${discount.discountName}`);
    };

    
    const proceedToCheckout = () => {
        navigate("/customer/checkout");
    };

    return (
        <div className="container mt-5">
            <CustomerNavbar/>
            <h2 className="text-center mb-4">Select a Discount</h2>
            {discounts.length === 0 ? (
                <p className="text-center">No discounts available</p>
            ) : (
                <div className="row">
                    {discounts.map((discount) => (
                        <div key={discount.discountCode} className="col-md-4 mb-3">
                            <div className="card p-3 shadow">
                                <h5>{discount.discountName}</h5>
                                <p><strong>Code:</strong> {discount.discountCode}</p>
                                <p><strong>Percentage:</strong> {discount.percentage}%</p>
                                <button 
                                    className="btn btn-primary w-100"
                                    onClick={() => handleSelectDiscount(discount)}
                                >
                                    Select Discount
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedDiscount && (
                <div className="text-center mt-4">
                    <h5>Selected Discount: {selectedDiscount.discountName} ({selectedDiscount.percentage}%)</h5>
                    <button className="btn btn-success" onClick={proceedToCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default SelectDiscount;
