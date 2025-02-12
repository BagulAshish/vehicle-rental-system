package com.vehiclerental.pojos;

import java.time.LocalDateTime;
import java.time.Year;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vehicle")
@NoArgsConstructor
@Setter
@Getter
public class Vehicle extends BaseEntity{

	@Column(length = 10, name = "vehicle_no")
	public String vehicleNo;
	
	@Column(length = 10, name = "rc_no")
	public String rcNo;
	
	@Column(length = 20, name = "model")
	public String model;
	
	@Column(length = 20, name = "make")
	public String make;
	
	@Column(length = 50, name = "description")
	public String description;
	
	@Column(name = "mileage")
	public double mileage;
	
	@Column(name = "mfg_year")
	public int mfgYear;
	
	@Column(name="cc")
	public int cc;
	
	@Column(name = "is_available", columnDefinition = "tinyint(1) DEFAULT 1")
	public boolean isAvailable = true;
	
	@Column(name = "cost_per_hour")
	public double costPerHour;
	
	@Enumerated(EnumType.STRING)
	public Type type;

	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;
	
	@ManyToOne
	@JoinColumn(name = "insurance_id")
	private Insurance insurance;
	
}
