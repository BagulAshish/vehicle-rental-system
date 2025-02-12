import { useEffect, useState } from "react";
import { getAllOwners } from "../service/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function OwnersList() {
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    const fetchOwners = async () => {
        
            const result = await getAllOwners ();
            if (result.status === 201){
                setOwners(result.data);
            } else {
                console.log(result.error)
            }
            
        
    };

    useEffect(() => {
       
        fetchOwners();
    }, [owners.pathname]);

    return (
        <div style={{backgroundColor : "black", color: "white", height: "1000px"}}>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-xl font-bold mb-4" style={{color: "white"}}>Location List</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Owner Add Date</th>
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
                        {owners.length > 0 ? (
                            owners.map((owner) => (
                                <tr key={owner.id}>
                                    <td>{owner.id}</td>
                                    <td>{owner.createdOn}</td>
                                    <td>{owner.username}</td>
                                    <td>{owner.email}</td>
                                    <td>{owner.firstName}</td>
                                    <td>{owner.middleName}</td>
                                    <td>{owner.lastName}</td>
                                    <td>{owner.mobileNo}</td>
                                    <td>{owner.address.city}</td>
                                    <td>{owner.address.zipCode}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No owners found.
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