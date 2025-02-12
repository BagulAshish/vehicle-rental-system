package com.vehiclerental.dto;

import com.vehiclerental.pojos.SecurityQuestion;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class ChangePasswordDTO {
	
	private String email;
	private SecurityQuestion securityQuestion;
	private String answer;
	private String password;

}
