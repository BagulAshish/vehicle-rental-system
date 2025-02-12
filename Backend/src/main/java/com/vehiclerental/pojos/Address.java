package com.vehiclerental.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "address")
@NoArgsConstructor
@Setter
@Getter
public class Address extends BaseEntity{
	
	@Column(length = 5, name = "house_no")
	private String houseNo;
	
	@Column(length = 50, name = "building")
	private String building;
	
	@Column(length = 50, name = "street")
	private String street;
	
	@Column(length = 50, name = "area")
	private String area;
	
	@Column(length = 30, name = "city")
	private String city;
	
	@Column(length = 30, name = "state")
	private String state;
	
	@Column(name = "zip_code", length = 6)
	private String zipCode;
	
}
