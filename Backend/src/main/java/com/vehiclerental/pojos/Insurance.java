package com.vehiclerental.pojos;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "insurance")
@NoArgsConstructor
@Setter
@Getter
public class Insurance extends BaseEntity{
	
	@Column(length = 10, name = "insurance_code")
	private String insuranceCode;
	
	@Column(length = 50, name = "insurance_name")
	private String insuranceName;
	
	@Column(length = 20, name = "insurance_company")
	private String insuranceCompany;
	
	@Column(name = "coverage_type")
	@Enumerated(EnumType.STRING)
	private CoverageType coverageType;
	
	@Column(name = "cost_per_month")
	private double costPerMonth;
}
