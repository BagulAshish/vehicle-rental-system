package com.vehiclerental.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.dao.UserDAO;
import com.vehiclerental.dao.VehicleDAO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.VehicleDTO;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.User;
import com.vehiclerental.pojos.Vehicle;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService{

	@Autowired
	private VehicleDAO vehicleDAO;
	
	@Autowired
	private UserDAO ownerDAO;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public Long addVehicle(Long oid, VehicleDTO vehicleDTO) {
		User owner = ownerDAO.findById(oid).orElseThrow(() -> new ResourceNotFoundException("Owner Not Found"));
		Vehicle vehicle = modelMapper.map(vehicleDTO, Vehicle.class);
		vehicle.setOwner(owner);
		vehicleDAO.save(vehicle);
		return vehicle.getId();
	}

	@Override
	public ApiResponse deleteVehicle(Long vid) {
		Vehicle vehicle = vehicleDAO.findById(vid).orElseThrow(() -> new ResourceNotFoundException("Vehicle Not Found"));
		vehicle.setStatus(false);
		return new ApiResponse("Vehicle Deleted With Id " + vehicle.getId());
	}

	@Override
	public Vehicle getVehicle(Long vid) {
		Vehicle vehicle  = vehicleDAO.findById(vid).orElseThrow(() -> new ResourceNotFoundException("Vehicle Not Found"));
		return vehicle;
	}

	@Override
	public List<Vehicle> getAllVehicles() {
		List<Vehicle> vehicleList = vehicleDAO.findAllByIsAvailable(true);
		return vehicleList;
	}

	@Override
	public ApiResponse updateVehicle(Long vid, VehicleDTO vehicleDTO) {
		Vehicle vehicle = vehicleDAO.findById(vid).orElseThrow(() -> new ResourceNotFoundException("Vehicle Not Found"));
		modelMapper.map(vehicleDTO, vehicle);
		vehicleDAO.save(vehicle);
		return new ApiResponse("Vehicle update with ID " + vehicle.getId());
	}

	@Override
	public List<Vehicle> getAllVehiclesForAdmin() {
		List<Vehicle> vehicleList = vehicleDAO.findAllByStatusTrue();
		return vehicleList;
	}

	@Override
	public List<Vehicle> getAllVehicles(Long oid) {
		User owner = ownerDAO.findById(oid).orElseThrow(() -> new ResourceNotFoundException("Owner Not Found"));
		List<Vehicle> vehicleList = vehicleDAO.findAllByOwnerAndStatusTrue(owner);
		return vehicleList;
	}
	
	

}
