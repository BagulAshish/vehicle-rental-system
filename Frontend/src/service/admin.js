import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { Buffer } from 'buffer';

export async function adminLogin(username, password) {
    try {
        const url = 'http://localhost:8080/auth/login'
        const body = {username, password}
        const response = await axios.post(url, body)
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function getAdmin() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;
        const url = 'http://localhost:8080/auth/' + id + '/profile'
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
        return response;
    } catch (ex){
        return {status : 'error', error: ex}
    }
    
}

export async function getAdminImage() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;
        const url = 'http://localhost:8080/auth/' + id + '/image'
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} });
        return response;
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function updateAdmin(username, email, firstName, middelName, lastName, mobileNo, houseNo, street, area, city, state, zipCode){
    try {
        const personDTO = {username, email, firstName, middelName, lastName, mobileNo}
        const address = {houseNo, street, area, city, state, zipCode}
        const body = {personDTO, address}
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id
        const url = 'http://localhost:8080/auth/' + id + '/update-profile'
        const response = await axios.put(url, body, { headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}


export async function addNewAdmin(photo, username, email, password, firstName, middleName, lastName, mobileNo, houseNo, building, street, area, city, state, zipcode) {
    try {
        const formData = new FormData();
        formData.append("photo", photo); // Attach the image file
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("middleName", middleName);
        formData.append("lastName", lastName);
        formData.append("mobileNo", mobileNo);
        formData.append("houseNo", houseNo);
        formData.append("building", building);
        formData.append("street", street);
        formData.append("area", area);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zipcode", zipcode);

        const url = "http://localhost:8080/users/admin/add";
        const token = sessionStorage.getItem("token");

        const response = await axios.post(url, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (ex) {
        return { status: "error", error: ex };
    }
}




export async function addLocation(landmark, street, area, city, state, zipCode) {
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/admin/add-new-loc'
        const body = {
            landmark,
            street,
            area,
            city,
            state, 
            zipCode
        }
        const response = await axios.post(url, body, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    }    catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function getAllCustomers() {
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/admin/all-customers';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getAllOwners() {
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/admin/all-owners';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getAllVehicles() {
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/admin/all-vehicles';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getAllLocations() {
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/admin/get-location';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response.data;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getLocationById(lid){
    try{
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/get-location/' + lid
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        return response.data
    } catch (ex){
        return {status : 'error', error: ex}
    } 
}

export async function updateLocation(lid, landmark, street, area, city, state, zipCode) {
    try{
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/update-location/' + lid
        const body = {
            landmark, street, area, city, state, zipCode
        }
        const response = axios.put(url, body, { headers: {"Authorization" : `Bearer ${token}`} })
        return response.data
    } catch (ex){
        return {status : 'error', error: ex}
    } 
}

export async function deleteLocation(lid) {
    try {
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/delete-location/' + lid
        const response = axios.patch(url, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function addDiscount(discountCode, discountName, expiryDate, percentage){
    try {
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/add-new-discount'
        const body = {discountCode, discountName, expiryDate, percentage}
        const response = axios.post(url, body, { headers: {"Authorization" : `Bearer ${token}`} })
        return response

    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function getAllDiscounts(){
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/admin/get-all-discounts';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response.data;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function deleteDiscount(did) {
    try {
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/delete-discount/' + did
        const response = axios.patch(url, {}, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function getDiscountById(did){
    try {
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/get-discount/' + did
        const response = axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function updateDiscount(did, discountCode, discountName, expiryDate, percentage){
    try {
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/update-discount/' + did
        const body = {discountCode, discountName, expiryDate, percentage}
        const response = axios.put(url, body, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function getAllOrder(){
    try {
        const token = sessionStorage.getItem('token')
        const url = 'http://localhost:8080/users/admin/orders'
        const response = axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}