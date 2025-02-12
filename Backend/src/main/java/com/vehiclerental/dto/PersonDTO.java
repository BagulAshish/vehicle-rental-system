package com.vehiclerental.dto;


import org.springframework.web.multipart.MultipartFile;

import com.vehiclerental.pojos.SecurityQuestion;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PersonDTO {

	private String username;
	private String email;
	private String password;
	private String firstName;
	private String middelName;
	private String lastName;
	private String mobileNo;
	private MultipartFile photo;
	
	private SecurityQuestion securityQuestion;
	private String answer;
	
}
