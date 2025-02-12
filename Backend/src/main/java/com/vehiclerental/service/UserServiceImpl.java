package com.vehiclerental.service;

import java.io.IOException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.dao.AddressDAO;
import com.vehiclerental.dao.UserDAO;
import com.vehiclerental.dto.PersonAddRequestDTO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.PersonDTO;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.Address;
import com.vehiclerental.pojos.Role;
import com.vehiclerental.pojos.SecurityQuestion;
import com.vehiclerental.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private AddressDAO addressDAO;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public ApiResponse addAdmin(PersonAddRequestDTO userAddRequestDTO) throws IOException{
		PersonDTO personDTO = userAddRequestDTO.getPersonDTO();
		String hashedPassword = passwordEncoder.encode(personDTO.getPassword());
		Address address = userAddRequestDTO.getAddress();
		User admin = modelMapper.map(personDTO, User.class);
		admin.setRole(Role.ROLE_ADMIN);
		admin.setPassword(hashedPassword);
		admin.setPhoto(personDTO.getPhoto().getBytes());
		userDAO.save(admin);
		Address add = addressDAO.save(address);
		admin.setAddress(add);
		return new ApiResponse("Added With Id" + admin.getId());
	}

	@Override
	public ApiResponse addCustomer(PersonAddRequestDTO customerAddRequestDTO) throws IOException {
		PersonDTO personDTO = customerAddRequestDTO.getPersonDTO();
		String hashedPassword = passwordEncoder.encode(personDTO.getPassword());
		Address address = customerAddRequestDTO.getAddress();
		User customer = modelMapper.map(personDTO, User.class);
		customer.setRole(Role.ROLE_CUSTOMER);
		customer.setPassword(hashedPassword);
		customer.setPhoto(personDTO.getPhoto().getBytes());
		userDAO.save(customer);
		Address add = addressDAO.save(address);
		customer.setAddress(add);
		return new ApiResponse("Added With Id" + customer.getId());
	}

	@Override
	public ApiResponse addOwner(PersonAddRequestDTO ownerAddRequestDTO)  throws IOException{
		PersonDTO personDTO = ownerAddRequestDTO.getPersonDTO();
		String hashedPassword = passwordEncoder.encode(personDTO.getPassword());
		Address address = ownerAddRequestDTO.getAddress();
		User owner = modelMapper.map(personDTO, User.class);
		owner.setPassword(hashedPassword);
		owner.setRole(Role.ROLE_OWNER);
		userDAO.save(owner);
		owner.setPhoto(personDTO.getPhoto().getBytes());
		Address add = addressDAO.save(address);
		owner.setAddress(add);
		return new ApiResponse("Added With Id" + owner.getId());
	}

	@Override
	public User getUser(Long uid) {
		User user = userDAO.findById(uid).orElseThrow(()-> new ResourceNotFoundException("User Not Found"));
		return user;
	}
	
	public ApiResponse updateUser(Long uid, PersonAddRequestDTO adminAddRequestDTO) {
		PersonDTO personDTO = adminAddRequestDTO.getPersonDTO();
		Address address = adminAddRequestDTO.getAddress();
		User user = userDAO.findById(uid).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		address.setId(user.getAddress().getId());
		modelMapper.map(personDTO, user);
		user.setAddress(address);
		addressDAO.save(address);
		userDAO.save(user);
		return new ApiResponse("User With ID " + user.getId() + " updated");
	}

	@Override
	public List<User> getAllCustomers() {
		List<User> customers = userDAO.findByRole(Role.ROLE_CUSTOMER);
		return customers;
	}

	@Override
	public List<User> getAllOwners() {
		List<User> owners = userDAO.findByRole(Role.ROLE_OWNER);
		return owners;
	}

	@Override
	public ApiResponse changePassword(String email, SecurityQuestion securityQuestion, String answer, String password) {
		User user = userDAO.findByEmail(email);
		user.setSecurityQuestion(securityQuestion);
		user.setAnswer(answer);
		String hashedPassword = passwordEncoder.encode(password);
		user.setPassword(hashedPassword);
		userDAO.save(user);
		return new ApiResponse("User with ID " + user.getId() + " password changed");
	}

}
