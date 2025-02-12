import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'; 
import { addCustomer } from '../service/customer';
import { addOwner } from '../service/owner';
import OwnerNavbar from '../components/OwnerNavbar';
import Footer from '../components/Footer';

function RegisterOwner() {
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    
    email: '',
    
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNo: '',
    
    houseNo: '',
    building: '',
    street: '',
    area: '',
    city: '',
    state: '',
    zipcode: '',
    securityQuestion: '',
    answer: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("No file selected!");
    if (file.size > 512 * 1024) return toast.error("File size must be less than 500KB!");
    setPhoto(file); 
  };

  const onRegister = async (e) => {
    e.preventDefault();
   

    if (formData.password !== formData.confirmPassword) return toast.warning('Passwords do not match');
    if (!/\d{10}$/.test(formData.mobileNo)) return toast.error("Mobile number must be exactly 10 digits!");
    if (!/\d{6}$/.test(formData.zipcode)) return toast.error("Zip Code must be exactly 6 digits!");
    const { ...otherFields } = formData;

    const formDataToSend = new FormData();
    console.log(photo)
    formDataToSend.append("photo", photo); 
    Object.keys(otherFields).forEach((key) => {
      formDataToSend.append(key, otherFields[key]); 
    });

    try {
      const result = await addOwner(formDataToSend);
      if (result.status === 201) {
        toast.success('Successfully registered! Redirecting...');
        navigate('/login');
      } else {
        toast.error(result?.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <>
    
    
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4">Register on Wheels on Demand</h3>
          <form onSubmit={onRegister}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Photo (Max 500KB)</label>
                <input type="file" name="photo" className="form-control" onChange={handlePhoto} accept="image/*" />
              </div>
              {["username", "firstName", "middleName", "lastName", "email", "mobileNo", "password", "confirmPassword", "houseNo", "building", "street", "area", "city", "state", "zipcode"].map((field, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <label className="form-label">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input
                    name={field}
                    type={field.includes("password") ? "password" : "text"}
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label className="form-label">Security Question</label>
              <select name="securityQuestion" className="form-select" onChange={handleChange} required>
                <option value="">--Select a Security Question--</option>
                <option value="PET">What is your pet's name?</option>
                <option value="MAIDEN">What is your mother’s maiden name?</option>
                <option value="SCHOOL">What was the name of your elementary school?</option>
                <option value="COLOUR">What is your favorite color?</option>
                <option value="NICKNAME">What is your childhood nickname?</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Answer</label>
              <input name="answer" type="text" className="form-control" onChange={handleChange} required />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default RegisterOwner;
