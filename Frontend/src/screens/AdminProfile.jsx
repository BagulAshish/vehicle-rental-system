import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmin, getAdminImage, updateAdmin } from "../service/admin";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function AdminProfile() {
    const [photo, setPhoto] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middelName, setMiddelName] = useState(""); // Keeping 'middelName' as requested
    const [lastName, setLastName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [building, setBuilding] = useState("");
    const [street, setStreet] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAdmin();
                const imageResult = await getAdminImage();

                if (result.status === 201) {
                    setUsername(result.data.username);
                    setEmail(result.data.email);
                    setPassword(result.data.password);
                    setFirstName(result.data.firstName);
                    setMiddelName(result.data.middelName);
                    setLastName(result.data.lastName);
                    setMobileNo(result.data.mobileNo);
                    setHouseNo(result.data.address.houseNo);
                    setBuilding(result.data.address.building);
                    setStreet(result.data.address.street);
                    setArea(result.data.address.area);
                    setCity(result.data.address.city);
                    setState(result.data.address.state);
                    setZipCode(result.data.address.zipCode);

                    setPreviewPhoto(`data:image/jpeg;base64,${imageResult.data}`);
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                toast.error("Failed to load admin details.");
            }
        };

        fetchData();
    }, []);

   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewPhoto(URL.createObjectURL(file)); 
        }
    };

   
    const validateForm = () => {
        if (!username ) {
            toast.error("All required fields must be filled!");
            return false;
        }

        if (!/^\d{10}$/.test(mobileNo)) {
            toast.error("Mobile number must be exactly 10 digits!");
            return false;
        }

        if (!/^\d{6}$/.test(zipCode)) {
            toast.error("Zip Code must be exactly 6 digits!");
            return false;
        }

        return true;
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {

            
            const result = await updateAdmin(username, email, firstName, middelName, lastName, mobileNo, houseNo, street, area, city, state, zipCode);
            console.log(result)
            if (result.status === 201) {
                toast.success("Profile updated successfully!");
                navigate("/admin/home");
            } else {
                toast.error(result.message || "Profile update failed! Please try again.");
            }
        } catch (error) {
            toast.error("Profile update failed! Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
           
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Profile</h2>

                
                <div className="mt-4">
                    {previewPhoto ? (
                        <img src={previewPhoto} alt="User" className="mx-auto rounded-full w-32 h-32 object-cover border-2 border-gray-400" />
                    ) : (
                        <p>Loading image...</p>
                    )}
                    
                    
                </div>

                <form onSubmit={handleSubmit}>
                    {[ 
                        { label: "Username", value: username, setter: setUsername },
                        { label: "Email", value: email, setter: setEmail, type: "email" },
                        { label: "First Name", value: firstName, setter: setFirstName },
                        { label: "Middle Name", value: middelName, setter: setMiddelName },
                        { label: "Last Name", value: lastName, setter: setLastName },
                        { label: "Mobile No.", value: mobileNo, setter: setMobileNo, type: "text" }
                    ].map(({ label, value, setter, type = "text" }) => (
                        <div key={label} className="mt-4">
                            <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                            <input
                                type={type}
                                className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                                placeholder={`Enter ${label.toLowerCase()}`}
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                            />
                        </div>
                    ))}

                    
                    {[ 
                        { label: "House No", value: houseNo, setter: setHouseNo },
                        { label: "Building", value: building, setter: setBuilding },
                        { label: "Street", value: street, setter: setStreet },
                        { label: "Area", value: area, setter: setArea },
                        { label: "City", value: city, setter: setCity },
                        { label: "State", value: state, setter: setState },
                        { label: "Zip Code", value: zipCode, setter: setZipCode }
                    ].map(({ label, value, setter }) => (
                        <div key={label} className="mt-4">
                            <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                                placeholder={label}
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                            />
                        </div>
                    ))}

                    <button type="submit" className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-gray-600 dark:hover:bg-gray-700">
                        Update
                    </button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}
