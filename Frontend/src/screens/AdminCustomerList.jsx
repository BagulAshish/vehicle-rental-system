import { useEffect, useState } from "react";
import { getAllCustomers, getAllOwners } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const fetchCustomers = async () => {
        
            const result = await getAllCustomers();
            if (result.status === 201){
                setCustomers(result.data);
            } else {
                console.log(result.error)
            }
            
        
    };

    useEffect(() => {
       
        fetchCustomers();
    }, [customers.pathname]);

    return (
        <div style={{backgroundColor : "black", color: "white", height: "1000px"}}>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-xl font-bold mb-4" style={{color: "white"}}>Customers List</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Customer Add Date</th>
                            <th>Username</th>
                            <th>Email Id</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Mobile No</th>
                            <th>City</th>
                            <th>Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.createdOn}</td>
                                    <td>{customer.username}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.middleName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.mobileNo}</td>
                                    <td>{customer.address.city}</td>
                                    <td>{customer.address.zipCode}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No customers found.
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