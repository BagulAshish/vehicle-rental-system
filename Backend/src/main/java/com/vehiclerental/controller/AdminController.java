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

import com.vehiclerental.dto.PersonAddRequestDTO;
import com.vehiclerental.dto.PersonDTO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.LoginDTO;
import com.vehiclerental.pojos.Address;
import com.vehiclerental.pojos.Discount;
import com.vehiclerental.pojos.Location;
import com.vehiclerental.pojos.User;
import com.vehiclerental.service.DiscountService;
import com.vehiclerental.service.LocationService;
import com.vehiclerental.service.OrderService;
import com.vehiclerental.service.UserService;
import com.vehiclerental.service.VehicleService;

@RestController
@RequestMapping("/users/admin")
@CrossOrigin("*")
public class AdminController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private LocationService locationService;
	
	@Autowired
	private DiscountService discountService;
	
	@Autowired
	private VehicleService vehicleService;
	
	@PostMapping(value = "/add", consumes = "multipart/form-data")
	public ResponseEntity<?> addAdmin(@RequestParam("photo") MultipartFile photo,
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
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.addAdmin(personAddRequestDTO));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/orders")
	public ResponseEntity<?> viewAllOrders() {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(orderService.viewAllOrders());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/add-new-loc")
	public ResponseEntity<?> addNewLocation(@RequestBody Location location){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.addNewLocation(location));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{aid}/profile")
	public ResponseEntity<?> getAdmin(@PathVariable Long aid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.getUser(aid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{aid}/image")
	public ResponseEntity<?> getAdminImage(@PathVariable Long aid){
		try {
			User user = userService.getUser(aid);
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
	
	@PutMapping("/{aid}/update-profile")
	public ResponseEntity<?> updateAdmin(@PathVariable Long aid, @RequestBody PersonAddRequestDTO adminAddRequestDTO){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateUser(aid, adminAddRequestDTO));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/get-location")
	public ResponseEntity<?> getLocation(){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.getLocation());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/get-location/{lid}")
	public ResponseEntity<?> getLocationById(@PathVariable Long lid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.getLocationById(lid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PutMapping("/update-location/{lid}")
	public ResponseEntity<?> updateLocation(@PathVariable Long lid, @RequestBody Location location){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.updateLocation(lid, location));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PatchMapping("/delete-location/{lid}")
	public ResponseEntity<?> deleteLocation(@PathVariable Long lid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.deleteLocation(lid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/add-new-discount")
	public ResponseEntity<?> addDiscount(@RequestBody Discount discount){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(discountService.AddDiscount(discount));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/get-all-discounts")
	public ResponseEntity<?> getAllDiscounts(){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(discountService.getAllDiscounts());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PatchMapping("/delete-discount/{did}")
	public ResponseEntity<?> deleteDiscounts(@PathVariable Long did){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(discountService.deleteDiscounts(did));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/get-discount/{did}")
	public ResponseEntity<?> getDiscountById(@PathVariable Long did){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(discountService.getDiscountById(did));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PutMapping("/update-discount/{did}")
	public ResponseEntity<?> updateDiscount(@PathVariable Long did, @RequestBody Discount discount){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(discountService.updateDiscount(did, discount));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/all-customers")
	public ResponseEntity<?> getAllCustomers(){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.getAllCustomers());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/all-owners")
	public ResponseEntity<?> getAllOwners(){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.getAllOwners());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/all-vehicles")
	public ResponseEntity<?> getAllVehicles(){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.getAllVehiclesForAdmin());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
}
