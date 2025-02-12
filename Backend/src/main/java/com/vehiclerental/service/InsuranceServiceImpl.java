package com.vehiclerental.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.dao.InsuranceDAO;
import com.vehiclerental.dao.VehicleDAO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.Insurance;
import com.vehiclerental.pojos.Vehicle;

@Service
@Transactional
public class InsuranceServiceImpl implements InsuranceService {

	@Autowired
	private InsuranceDAO insuranceDAO;
	
	@Autowired
	private VehicleDAO vehicleDAO;
	
	@Override
	public ApiResponse AddInsurance(Long vid, Insurance insurance) {
		Insurance ins = insuranceDAO.save(insurance);
		Vehicle vehicle = vehicleDAO.findById(vid).orElseThrow(() -> new ResourceNotFoundException("Vehicle Not Found"));
		vehicle.setInsurance(ins);
		return new ApiResponse("Insurance with ID " + ins.getId() + " is added for vehicle id " + vehicle.getId());
	}

}
