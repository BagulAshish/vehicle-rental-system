package com.vehiclerental.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ApiResponse {

	private String message;
	private Long id;
	
	private LocalDateTime timestamp;
	
	public ApiResponse(String message) {
		this.message = message;
		timestamp = LocalDateTime.now();
	}

	public ApiResponse(String message, Long id) {
		super();
		this.message = message;
		this.id = id;
		this.timestamp =  LocalDateTime.now();
	}
	
}
