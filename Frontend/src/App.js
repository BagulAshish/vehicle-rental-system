import './App.css';
import AddLocation from './screens/AdminAddNewLocation';
import { Route, Routes } from 'react-router-dom';
import GetAllLocations from './screens/AdminGetAllLocation';
import UpdateLocation from './screens/AdminUpdateLocation';
import { ToastContainer } from 'react-toastify';
import AdminLogin from './screens/CommonLogin';
import AdminDashboard from './screens/AdminDashboard';
import AddNewAdmin from './screens/AdminAddNew';
import AdminProfile from './screens/AdminProfile';
import AddNewDiscount from './screens/AdminAddNewDiscount';
import GetAllDiscounts from './screens/AdminGetAllDiscounts';
import UpdateDiscount from './screens/AdminUpdateDiscount';
import AddVehicle from './screens/OwnerAddVehicle';
import AddInsurance from './screens/OwnerAddInsurance';
import OwnerDashboard from './screens/OwnerDashboard';
import OwnersList from './screens/AdminOwnerList';
import CustomersList from './screens/AdminCustomerList';
import VehiclesList from './screens/AdminVehicleList';
import OwnerVehiclesList from './screens/OwnerVehicleList';
import Register from './screens/CommonSignup';
import Home from './screens/CommonHome';
import ChangePassword from './screens/CommonForgotPassword';
import CustomerDashboard from './screens/CustomerDashboard';
import VehicleDetails from './screens/CustomerVehicleDetails';
import CustomerInsuranceDetails from './screens/CustomerGetInsurance';
import CustomerOwnerDetails from './screens/CustomerGetOwner';
import SelectDiscount from './screens/CustomerSelectDiscount';
import Bill from './screens/CustomerCheckout';
import PaymentDetails from './screens/CustomerPayment';
import CustomerOrders from './screens/CustomerAllOrders';
import RegisterOwner from './screens/OwnerSignup';
import OwnerOrders from './screens/OwnerAllOrders';
import UpdateVehicle from './screens/OwnerUpdateVehicle';
import PrivacyPolicy from './components/PrivacyPolicy';
import RentalAgreement from './components/RentalAgreement';
import RefundCancellation from './components/RefundCancellation';
import TermsAndConditions from './components/TermsAndConditions';
import DamagePenalties from './components/DamagePenalties';
import AvailableCities from './components/AvailableCities';
import HeadingOutstations from './components/HeadingOutstations';
import ContactUs from './components/ContactUs';
import GetAllOrders from './screens/AdminOrders';


function App() {
  return (
    <div className='container-fluid'>
      <ToastContainer/>
 
        <Routes>
          
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<AdminLogin/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgot-password' element={<ChangePassword />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/rental-agreement' element={<RentalAgreement />} />
        <Route path='/refund-cancellation' element={<RefundCancellation />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/damage-penalties' element={<DamagePenalties />} />
        <Route path='/available-cities' element={<AvailableCities />} />
        <Route path='/heading-outstations' element={<HeadingOutstations />} />
        <Route path='/contact-us' element={<ContactUs />} />

        <Route path='/admin/home' element={<AdminDashboard/>}/>  
        <Route path='/profile' element={<AdminProfile/>} />
        <Route path='/admin/add-new-admin' element={<AddNewAdmin/>}/>
        <Route path='/admin/add-location' element={<AddLocation />}/>
        <Route path='/admin/get-all-locations' element={<GetAllLocations/>}/>
        <Route path='/admin/get-all-customers' element={<CustomersList />}/>
        <Route path='/admin/get-all-owners' element={<OwnersList/>}/>
        <Route path='/admin/get-all-vehicles' element={<VehiclesList/>}/>
        <Route path='/admin/get-all-orders' element={<GetAllOrders />}/>
        <Route path='/admin/update-by-id/:lid' element={<UpdateLocation/>}/>
        <Route path='/admin/add-discount' element={<AddNewDiscount/>}/>
        <Route path='/admin/get-all-discounts' element={<GetAllDiscounts/>}/>
        <Route path='/admin/update-discount-by-id/:did' element={<UpdateDiscount/>}/>
            
        
        <Route path='/owner/home' element={<OwnerDashboard />} />
        <Route path='/owner/add-vehicle' element={<AddVehicle/>}/>
        <Route path='/owner/add-insurance' element={<AddInsurance />} />
        <Route path='/owner/get-all-vehicles' element={<OwnerVehiclesList />}/>
        <Route path='/owner/register' element={<RegisterOwner/>} />
        <Route path='/owner/orders' element={<OwnerOrders/>} />
        <Route path='/owner/update-vehicle/:vid' element={<UpdateVehicle/>} />

          
        <Route path='/customer/home' element={<CustomerDashboard/>} />
        <Route path='/customer/vehicle-details' element={<VehicleDetails/>}/>
        <Route path='/customer/get-insurance-details' element={<CustomerInsuranceDetails/>}/>
        <Route path='/customer/get-owner-details' element={<CustomerOwnerDetails/>}/>
        <Route path='/customer/select-discount' element={<SelectDiscount />}/>
        <Route path='/customer/checkout' element={<Bill />}/>
        <Route path='/customer/payment' element={<PaymentDetails />}/>
        <Route path='/customer/orders' element={<CustomerOrders />}/>
        


      </Routes>
      
    </div>
  );
}

export default App;
