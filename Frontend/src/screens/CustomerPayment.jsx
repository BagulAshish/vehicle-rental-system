import { useState } from "react";
import { payBill } from "../service/customer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar";
import Footer from "../components/Footer";

const PaymentDetails = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const navigate = useNavigate()

    const handlePayment = async () => {
        
        alert("Payment initiated!");
        const result = await payBill()
        console.log(result)
        if (result.status === 201){
            toast.success('Payment successful')
            navigate('/customer/home')
            localStorage.removeItem('bid')
            localStorage.removeItem('vid')
            localStorage.removeItem('did')
            localStorage.removeItem('orid')
        }
    };

    return (
        <div className="container mt-5">
            <CustomerNavbar/>
            <h2 className="text-center mb-4">Credit Card Payment Details</h2>
            <div className="card p-4 shadow">
                <h4>Enter Payment Information</h4>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9876 5432"
                            maxLength="16"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cardholder Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expiry Date</label>
                        <input
                            type="month"
                            className="form-control"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CVV</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            maxLength="3"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={handlePayment}
                    >
                        Pay Now
                    </button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default PaymentDetails;
