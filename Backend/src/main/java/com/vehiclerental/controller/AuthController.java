package com.vehiclerental.controller;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.vehiclerental.dao.UserDAO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.LoginDTO;
import com.vehiclerental.dto.PersonAddRequestDTO;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.User;
import com.vehiclerental.security.JWTUtil;
import com.vehiclerental.service.CustomUserDetailsService;
import com.vehiclerental.service.UserService;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
	@Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
	private final CustomUserDetailsService userDetailsService;
    @Autowired
    private final JWTUtil jwtUtil;
    @Autowired
    private UserDAO userDAO;
    
    @Autowired
    private UserService userService;

    public AuthController(AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
            );
            User user = userDAO.findByUsername(loginDTO.getUsername()).orElseThrow(()-> new ResourceNotFoundException("User Not Found"));
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getUsername());
            String token = jwtUtil.generateToken(userDetails, user.getId());
            System.out.println(token);
            return ResponseEntity.ok(new ApiResponse(token));
        } catch (BadCredentialsException e) {
        	System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Invalid username or password"));
        } catch (Exception e) {
        	System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
        }
    }
    
    @GetMapping("/{aid}/profile")
	public ResponseEntity<?> profile(@PathVariable Long aid){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(userService.getUser(aid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
    
    @GetMapping("/{aid}/image")
	public ResponseEntity<?> getImage(@PathVariable Long aid){
		try {
			User user = userService.getUser(aid);
			byte[] imageBytes = user.getPhoto();
		    
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
}

