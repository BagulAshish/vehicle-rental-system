import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function addCustomer(formData) {
    try {
        const url = "http://localhost:8080/users/customers/add";
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    } catch (ex) {
        return { status: "error", error: ex };
    }
}

export async function resetPassword(email, securityQuestion, answer, password) {
    try {
        const url = "http://localhost:8080/users/customers/change-password";
        const body = {email, securityQuestion, answer, password}
        const response = axios.post(url, body)
        return response;
    } catch (ex) {
        return { status: "error", error: ex };
    }
}

export async function getAllVehiclesForCustomer() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const cid = decodedToken.id
        const url = 'http://localhost:8080/users/customers/' +cid + '/get-all-vehicles';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getVehicleDetails(vid) {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const cid = decodedToken.id 
        const url = 'http://localhost:8080/users/customers/' +cid + '/get-vehicle-details/' + vid;
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
    
}

export async function getLocations() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const cid = decodedToken.id 
        const url = 'http://localhost:8080/users/customers/' +cid + '/get-location';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function placeOrder(pickUpLocation, dropLocation, pickUpDateTime, dropDateTime) {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const cid = decodedToken.id 
        const vid = localStorage.getItem('vid')
        const url = 'http://localhost:8080/users/customers/' + cid + '/' + vid +'/place';
        const body = {pickUpLocation, dropLocation, pickUpDateTime, dropDateTime}
        console.log(body)
        const response = await axios.post(url, body, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getAvailableDiscounts() {
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/customers/get-all-discounts';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getBillDetails() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const cid = decodedToken.id 
        const did = localStorage.getItem('did')
        const orid = localStorage.getItem('orid')
        const url = 'http://localhost:8080/users/customers/' + cid +'/' + orid + '/' + did +'/get-bill';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function cancelOrder() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const cid = decodedToken.id 
        const orid = localStorage.getItem('orid')
        const url = 'http://localhost:8080/users/customers/' + cid +'/' + orid + '/cancel';
        const response = await axios.patch(url,{}, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function payBill() {
    try {
        const token = sessionStorage.getItem('token');
        const bid = localStorage.getItem('bid')
        const url = 'http://localhost:8080/users/customers/' + bid + '/pay-bill';
        const response = await axios.patch(url, {}, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function getOrdersOfCustomer() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const cid = decodedToken.id 
        const url = 'http://localhost:8080/users/customers/' + cid + '/all';
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
}

export async function completeOrder(orid) {
    try {
        const token = sessionStorage.getItem('token');
        const url = 'http://localhost:8080/users/customers/' + orid + '/complete';
        const response = await axios.patch(url, {}, { headers: {"Authorization" : `Bearer ${token}`} }); 
        return response;
    } catch (ex) {
        return { status: 'error', error: ex };
    }
    
}