package com.vehiclerental.service;

import java.util.List;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.VehicleDTO;
import com.vehiclerental.pojos.Vehicle;

public interface VehicleService {

	Long addVehicle(Long oid, VehicleDTO vehicleDTO);

	ApiResponse deleteVehicle(Long vid);

	Vehicle getVehicle(Long vid);

	List<Vehicle> getAllVehicles(); 
	
	List<Vehicle> getAllVehicles(Long oid); //overload

	ApiResponse updateVehicle(Long vid, VehicleDTO vehicleDTO);

	List<Vehicle> getAllVehiclesForAdmin();

}
