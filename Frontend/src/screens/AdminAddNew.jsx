import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewAdmin } from "../service/admin";
import { toast } from "react-toastify";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function AddNewAdmin() {
    const [photo, setPhoto] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [building, setBuilding] = useState('');
    const [street, setStreet] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const navigate = useNavigate();

    const handlePhoto = (e) => {
        const file = e.target.files[0];

        if (!file) {
            toast.error("No file selected!");
            return;
        }

        if (file.size > 512 * 1024) { // 500KB limit
            toast.error("File size must be less than 500KB!");
            return;
        }

        setPhoto(file); 
    };

 
    const validateForm = () => {
        if (!username || !email || !password || !firstName || !lastName || !mobileNo || !zipCode || !houseNo || !building || !street || !area || !city || !state || !middleName || !photo) {
            toast.error("All required fields must be filled, including the photo!");
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
            const result = await addNewAdmin(photo, username, email, password, firstName, middleName, lastName, mobileNo, houseNo, building, street, area, city, state, zipCode);

            if (result.status === 201) {
                toast.success("New Admin Added Successfully");
                navigate("/admin/home");
            } else {
                toast.error(result.message || "Signup failed! Please try again.");
            }
        } catch (error) {
            toast.error("Signup failed! Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Add New Admin</h2>

                <div className="mt-4">
                    <label className="block text-gray-700 dark:text-gray-300">Photo (Size should be less than 500KB)</label>
                    <input
                        type="file"
                        name="photo"
                        className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                        onChange={handlePhoto}
                        accept="image/*"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 dark:text-gray-300">Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {[
                    { label: "Email", value: email, setter: setEmail, type: "email" },
                    { label: "First Name", value: firstName, setter: setFirstName },
                    { label: "Middle Name", value: middleName, setter: setMiddleName },
                    { label: "Last Name", value: lastName, setter: setLastName },
                    { label: "Password", value: password, setter: setPassword, type: "password" },
                    { label: "Mobile No.", value: mobileNo, setter: setMobileNo },
                ].map(({ label, value, setter, type = "text" }) => (
                    <div key={label} className="mt-4">
                        <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                        <input
                            type={type}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                            placeholder={`Enter ${label}`}
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
                ].map(({ label, value, setter }) => (
                    <div key={label} className="mt-2">
                        <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                            placeholder={label}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                        />
                    </div>
                ))}

                <div className="mt-4">
                    <label className="block text-gray-700 dark:text-gray-300">Zip Code</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                        placeholder="Enter zip code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-gray-600 dark:hover:bg-gray-700"
                    onClick={handleSubmit}
                >
                    Add New Admin
                </button>
            </div>
            <Footer/>
        </div>
    );
}
