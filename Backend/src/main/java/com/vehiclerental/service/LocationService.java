package com.vehiclerental.service;

import java.util.List;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.pojos.Location;

public interface LocationService {

	ApiResponse addPickUpLocation(Long orid, Long lid);

	ApiResponse addDropLocation(Long orid, Long lid);

	ApiResponse addNewLocation(Location location);

	List<Location> getLocation();

	Location getLocationById(Long lid);

	ApiResponse updateLocation(Long lid, Location location);

	ApiResponse deleteLocation(Long lid);

}
