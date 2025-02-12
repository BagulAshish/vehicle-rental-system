package com.vehiclerental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.dao.LocationDAO;
import com.vehiclerental.dao.OrderDAO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.Location;
import com.vehiclerental.pojos.Order;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {

	@Autowired
	private LocationDAO locationDAO;
	
	@Autowired
	private OrderDAO orderDAO;
	
	@Override
	public ApiResponse addPickUpLocation(Long orid, Long lid) {
		Order order =  orderDAO.findById(orid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		Location location = locationDAO.findById(lid).orElseThrow(() -> new ResourceNotFoundException("Location Not Found"));
		order.setPickUpLocation(location);
		return new ApiResponse("Pick Up Location Added With Id " + location.getId());
	}

	@Override
	public ApiResponse addDropLocation(Long orid, Long lid) {
		Order order =  orderDAO.findById(orid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		Location location = locationDAO.findById(lid).orElseThrow(() -> new ResourceNotFoundException("Location Not Found"));
		order.setDropLocation(location);
		return new ApiResponse("Pick Up Location Added With Id " + location.getId());
	}

	@Override
	public ApiResponse addNewLocation(Location location) {
		Location loc = locationDAO.save(location);
		return new ApiResponse("Location Added With Id "+ loc.getId());
	}

	@Override
	public List<Location> getLocation() {
		
		return locationDAO.findByStatusTrue();
	}

	@Override
	public Location getLocationById(Long lid) {
		Location location = locationDAO.findById(lid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		return location;
	}

	@Override
	public ApiResponse updateLocation(Long lid, Location location) {
		Location loc = locationDAO.findById(lid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));		
		location.setId(loc.getId());
		locationDAO.save(location);
		return new ApiResponse("Location Updated With Id " + location.getId());
	}

	@Override
	public ApiResponse deleteLocation(Long lid) {
		Location location = locationDAO.findById(lid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));	
		location.setStatus(false);
		return new ApiResponse("Location Deleted With Id " + location.getId());
	}

}
