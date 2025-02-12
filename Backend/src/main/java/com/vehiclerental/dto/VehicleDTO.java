package com.vehiclerental.dto;


import com.vehiclerental.pojos.Type;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class VehicleDTO {

	public String vehicleNo;
	public String rcNo;
	public String model;
	public String make;
	public String description;
	public double mileage;
	public int cc;
	public int mfgYear;
	public double costPerHour;
	public Type type;
}
