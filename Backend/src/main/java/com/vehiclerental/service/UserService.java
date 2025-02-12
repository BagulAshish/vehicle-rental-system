package com.vehiclerental.service;


import com.vehiclerental.dto.PersonAddRequestDTO;

import java.io.IOException;
import java.util.List;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.LoginDTO;
import com.vehiclerental.pojos.SecurityQuestion;
import com.vehiclerental.pojos.User;

public interface UserService {

	ApiResponse addAdmin(PersonAddRequestDTO adminAddRequestDTO) throws IOException;

	ApiResponse addCustomer(PersonAddRequestDTO customerAddRequestDTO) throws IOException;

	ApiResponse addOwner(PersonAddRequestDTO ownerAddRequestDTO) throws IOException;

	User getUser(Long uid);
	
	ApiResponse updateUser(Long uid, PersonAddRequestDTO adminAddRequestDTO);

	List<User> getAllCustomers();

	List<User> getAllOwners();

	ApiResponse changePassword(String email, SecurityQuestion securityQuestion, String answer, String password);
}
