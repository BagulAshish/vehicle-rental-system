package com.vehiclerental.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "discount")
@NoArgsConstructor
@Setter
@Getter
public class Discount extends BaseEntity{
	
	@Column(length = 10, name = "discount_code")
	private String discountCode;
	
	@Column(length = 20)
	private String discountName;
	
	@Column(name = "expiry_date")
	private LocalDate expiryDate;
	
	@Column(name = "percentage")
	private double percentage;
	
}
