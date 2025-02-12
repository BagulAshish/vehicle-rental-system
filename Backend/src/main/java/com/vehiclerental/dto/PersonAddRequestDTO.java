package com.vehiclerental.dto;

import com.vehiclerental.pojos.Address;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PersonAddRequestDTO {
	private PersonDTO personDTO;
    private Address address;
}
