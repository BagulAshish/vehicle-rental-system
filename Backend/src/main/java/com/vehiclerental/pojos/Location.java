package com.vehiclerental.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "location")
@NoArgsConstructor
@Setter
@Getter
public class Location extends BaseEntity{

	@Column(name = "landmark", length = 30)
	private String landmark;
	
	@Column(name = "street", length = 30)
	private String street;
	
	@Column(name = "area", length = 30)
	private String area;
	
	@Column(name = "city", length = 30)
	private String city;
	
	@Column(name = "state", length = 30)
	private String state;
	
	@Column(name = "zip_code", length = 6)
	private String zipCode;
	
}
