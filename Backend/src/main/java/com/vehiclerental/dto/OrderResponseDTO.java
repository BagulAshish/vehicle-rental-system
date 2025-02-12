package com.vehiclerental.dto;

import com.vehiclerental.pojos.Billing;
import com.vehiclerental.pojos.Vehicle;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class OrderResponseDTO {
	
	private Long id;
	private Vehicle vehicle;
	private Billing billing;

}
