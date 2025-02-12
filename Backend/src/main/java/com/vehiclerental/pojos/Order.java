package com.vehiclerental.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@Setter
@Getter
public class Order extends BaseEntity{

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private User customer;
	
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;
	
	@ManyToOne
	@JoinColumn(name = "vehicle_id")
	private Vehicle vehicle;
	
	@Column(name = "order_date")
	private LocalDate orderDate = LocalDate.now();
	
	@Column(name = "pick_up_time")
	private LocalDateTime pickUpTime;
	
	@Column(name = "drop_time")
	private LocalDateTime dropTime;
	
	@ManyToOne
	@JoinColumn(name = "pick_up_location_id")
	private Location pickUpLocation;
	
	@ManyToOne
	@JoinColumn(name = "drop_location_id")
	private Location dropLocation;
	
	@OneToOne
	@JoinColumn(name = "billing_id")
	@JsonIgnore
	private Billing billing;
}
