package com.vehiclerental.dto;


import java.time.LocalDateTime;

import com.vehiclerental.pojos.Location;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class OrderDTO {
	
	private Long pickUpLocation;
	private Long dropLocation;
	private String pickUpDateTime;
    private String dropDateTime;

    

}
