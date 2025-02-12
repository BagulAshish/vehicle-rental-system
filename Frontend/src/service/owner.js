import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function addNewVehicle(vehicleNo, rcNo, model, make, description, mileage, cc, mfgYear, costPerHour, type){
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id
        const url = 'http://localhost:8080/users/owners/'+ id +'/add'
        const body = {vehicleNo, rcNo, model, make, description, mileage, cc, mfgYear, costPerHour, type} 
        const response = await axios.post(url, body, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function addNewInsurance(insuranceCode, insuranceName, insuranceCompany, coverageType, costPerMonth) {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const oid = decodedToken.id
        const vid = localStorage.getItem('vid')
        const url = 'http://localhost:8080/users/owners/' + oid +'/insurance/' + vid
        const body = {insuranceCode, insuranceName, insuranceCompany, coverageType, costPerMonth}
        const response = await axios.post(url, body, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function getVehiclesOfOwner() {
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const oid = decodedToken.id
        const url = 'http://localhost:8080/users/owners/' + oid
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
    
}

export async function deleteVehicle(vid){
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const oid = decodedToken.id
        const url = 'http://localhost:8080/users/owners/' + oid + '/delete/' + vid
        const response = await axios.patch(url, {}, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function addOwner(formData){
    try {
        const url = "http://localhost:8080/users/owners/add";
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

export async function getOrdersOfOwner(){
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const oid = decodedToken.id
        const url = 'http://localhost:8080/users/owners/' + oid + '/orders'
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function getVehicleById(vid){
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const oid = decodedToken.id
        const url = 'http://localhost:8080/users/owners/' + oid + '/' + vid
        const response = await axios.get(url, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}

export async function updateVehicle(formData, vid){
    try {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const oid = decodedToken.id
        const url = 'http://localhost:8080/users/owners/' + oid + '/' + vid + '/update-vehicle'
        const response = await axios.put(url, formData, { headers: {"Authorization" : `Bearer ${token}`} })
        return response
    } catch (ex){
        return {status : 'error', error: ex}
    }
}