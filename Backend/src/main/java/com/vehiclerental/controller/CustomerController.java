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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.ChangePasswordDTO;
import com.vehiclerental.dto.OrderDTO;
import com.vehiclerental.dto.PersonAddRequestDTO;
import com.vehiclerental.dto.PersonDTO;
import com.vehiclerental.pojos.Address;
import com.vehiclerental.pojos.SecurityQuestion;
import com.vehiclerental.pojos.User;
import com.vehiclerental.service.BillService;
import com.vehiclerental.service.DiscountService;
import com.vehiclerental.service.LocationService;
import com.vehiclerental.service.OrderService;
import com.vehiclerental.service.UserService;
import com.vehiclerental.service.VehicleService;

@RestController
@RequestMapping("/users/customers")
@CrossOrigin("*")
public class CustomerController {

	@Autowired
	private UserService personService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private LocationService locationService;
	
	@Autowired
	private BillService billService;
	
	@Autowired
	private VehicleService vehicleService;
	
	@Autowired
	private DiscountService discountService;
	
	@PostMapping(value = "/add", consumes = "multipart/form-data")
	public ResponseEntity<?> addCustomer(@RequestParam("photo") MultipartFile photo,  // Handle image upload
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("confirmPassword") String confirmPassword,
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
            @RequestParam("zipcode") String zipcode,
            @RequestParam("securityQuestion") SecurityQuestion securityQuestion,
            @RequestParam("answer") String answer) {
		try {
			PersonDTO personDTO = new PersonDTO();
			personDTO.setUsername(username);
			personDTO.setEmail(email);
			personDTO.setPassword(password);
			personDTO.setFirstName(firstName);
			personDTO.setMiddelName(middleName);
			personDTO.setMobileNo(mobileNo);
			personDTO.setPhoto(photo);
			personDTO.setSecurityQuestion(securityQuestion);
			personDTO.setAnswer(answer);
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
			return ResponseEntity.status(HttpStatus.CREATED).body(personService.addCustomer(personAddRequestDTO));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(personService.changePassword(changePasswordDTO.getEmail(), 
					changePasswordDTO.getSecurityQuestion(), changePasswordDTO.getAnswer(),
					changePasswordDTO.getPassword()));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/profile")
	public ResponseEntity<?> getCustomer(@PathVariable Long cid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(personService.getUser(cid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/image")
	public ResponseEntity<?> getCustomerImage(@PathVariable Long aid){
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
	
	@PutMapping("/{cid}/update-profile")
	public ResponseEntity<?> updateCustomer(@PathVariable Long cid, @RequestBody PersonAddRequestDTO customerAddRequestDTP){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(personService.updateUser(cid, customerAddRequestDTP));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/{cid}/{vid}/place")
	public ResponseEntity<?> placeOrder(@PathVariable Long cid, @PathVariable Long vid, @RequestBody OrderDTO orderDTO){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(orderService.placeOrder(cid, vid, orderDTO));
		} catch (RuntimeException e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/{orid}")
	public ResponseEntity<?> viewOrder(@PathVariable Long orid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(orderService.viewOrder(orid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/all")
	public ResponseEntity<?> viewAllOrdersOfCustomer(@PathVariable Long cid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(orderService.viewAllOrdersOfCustomer(cid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PatchMapping("/{cid}/{orid}/cancel")
	public ResponseEntity<?> cancelOrder(@PathVariable Long cid, @PathVariable Long orid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(orderService.cancelOrder(orid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PostMapping("/{cid}/{orid}/{lid}/add-pickup-loc")
	public ResponseEntity<?> addPickUpLocation(@PathVariable Long cid, @PathVariable Long orid, @PathVariable Long lid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.addPickUpLocation(orid, lid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/{cid}/{orid}/{lid}/add-drop-loc")
	public ResponseEntity<?> addDropLocation(@PathVariable Long cid, @PathVariable Long orid, @PathVariable Long lid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.addDropLocation(orid, lid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/get-location")
	public ResponseEntity<?> getLocation(){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(locationService.getLocation());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/{orid}/{did}/get-bill")
	public ResponseEntity<?> getBill(@PathVariable Long cid, @PathVariable Long orid, @PathVariable Long did){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(billService.getBill(cid, orid, did));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PatchMapping("/{bid}/pay-bill")
	public ResponseEntity<?> payBill(@PathVariable Long bid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(billService.payBill(bid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/get-all-vehicles")
	public ResponseEntity<?> getAllVehicles(@PathVariable Long cid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.getAllVehicles());
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{cid}/get-vehicle-details/{vid}")
	public ResponseEntity<?> getVehicle(@PathVariable Long cid, @PathVariable Long vid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.getVehicle(vid));
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
	
	@PatchMapping("/{orid}/complete")
	public ResponseEntity<?> completeOrder(@PathVariable Long orid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(orderService.completeOrder(orid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
}
