package com.vehiclerental.controller;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.PersonAddRequestDTO;
import com.vehiclerental.dto.PersonDTO;
import com.vehiclerental.dto.VehicleDTO;
import com.vehiclerental.pojos.Address;
import com.vehiclerental.pojos.Insurance;
import com.vehiclerental.pojos.User;
import com.vehiclerental.service.DiscountService;
import com.vehiclerental.service.InsuranceService;
import com.vehiclerental.service.OrderService;
import com.vehiclerental.service.UserService;
import com.vehiclerental.service.VehicleService;

@RestController
@RequestMapping("/users/owners")
@CrossOrigin("*")
public class OwnerController {
	
	@Autowired
	private UserService personService;
	
	@Autowired
	private VehicleService vehicleService;
	
	@Autowired
	private InsuranceService insuranceService;
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/add")
	public ResponseEntity<?> addOwner(@RequestParam("photo") MultipartFile photo,
	        @RequestParam("username") String username,
	        @RequestParam("email") String email,
	        @RequestParam("password") String password,
	        @RequestParam("firstName") String firstName,
	        @RequestParam("middleName") String middleName,
	        @RequestParam("lastName") String lastName,
	        @RequestParam("mobileNo") String mobileNo,
	        @RequestParam("houseNo") String houseNo,
	        @RequestParam("building") String building,
	        @RequestParam("street") String street,
	        @RequestParam("area") String area,
	        @RequestParam("city") String city,
	        @RequestParam("state") String state,
	        @RequestParam("zipcode") String zipcode) {
		try {
			PersonDTO personDTO = new PersonDTO();
			personDTO.setUsername(username);
			personDTO.setEmail(email);
			personDTO.setPassword(password);
			personDTO.setFirstName(firstName);
			personDTO.setMiddelName(middleName);
			personDTO.setMobileNo(mobileNo);
			personDTO.setPhoto(photo);
			Address address = new Address();
			address.setHouseNo(houseNo);
			address.setBuilding(building);
			address.setStreet(street);
			address.setArea(area);
			address.setCity(city);
			address.setState(state);
			address.setZipCode(zipcode);
			PersonAddRequestDTO personAddRequestDTO = new PersonAddRequestDTO();
			personAddRequestDTO.setAddress(address);
			personAddRequestDTO.setPersonDTO(personDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body(personService.addOwner(personAddRequestDTO));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{oid}/profile")
	public ResponseEntity<?> getOwner(@PathVariable Long oid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(personService.getUser(oid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{oid}/image")
	public ResponseEntity<?> getOwnerImage(@PathVariable Long aid){
		try {
			User user = personService.getUser(aid);
			byte[] imageBytes = user.getPhoto(); // Fetch image as byte[]
		    
		    if (imageBytes != null) {
		        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
		        return ResponseEntity.ok(base64Image);
		    } else {
		        return ResponseEntity.notFound().build();
		    }
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PutMapping("/{oid}/update-profile")
	public ResponseEntity<?> updateOwner(@PathVariable Long oid, @RequestBody PersonAddRequestDTO ownerAddRequestDTP){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(personService.updateUser(oid, ownerAddRequestDTP));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/{oid}/add")
	public ResponseEntity<?> addVehicle(@PathVariable Long oid, @RequestBody VehicleDTO vehicleDTO){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.addVehicle(oid, vehicleDTO));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PatchMapping("/{oid}/delete/{vid}")
	public ResponseEntity<?> deleteVehicle(@PathVariable Long oid, @PathVariable Long vid){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(vehicleService.deleteVehicle(vid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/{vid}")
	public ResponseEntity<?> getVehicle(@PathVariable Long cid, @PathVariable Long vid){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(vehicleService.getVehicle(vid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{oid}")
	public ResponseEntity<?> getAllVehicles(@PathVariable Long oid){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(vehicleService.getAllVehicles(oid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/{oid}/insurance/{vid}")
	public ResponseEntity<?> addInsurance(@PathVariable Long oid, @PathVariable Long vid, @RequestBody Insurance insurance){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(insuranceService.AddInsurance(vid, insurance));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	
	@PutMapping("/{oid}/{vid}/update-vehicle")
	public ResponseEntity<?> updateVehicle(@PathVariable Long oid, @PathVariable Long vid, @RequestBody VehicleDTO vehicleDTO){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.updateVehicle(vid, vehicleDTO));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

	
	@GetMapping("/{oid}/orders")
	public ResponseEntity<?> getOrdersOfOwner(@PathVariable Long oid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(orderService.getOrdersOfOwner(oid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
}
