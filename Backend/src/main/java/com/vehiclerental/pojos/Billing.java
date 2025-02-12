package com.vehiclerental.pojos;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "billing")
public class Billing extends BaseEntity{

	@Column(name = "bill_date")
	private LocalDateTime billDate = LocalDateTime.now();
	
	@Column(name = "tax_amount")
	private double taxAmount = 1.18;
	
	@Column(name = "rent_hours")
	private double rentHours;
	
	@Column(name = "total_rent_amount")
	private double totalRentAmount;
	
	@Column(name = "total_amount")
	private double totalAmount;
	
	@Enumerated(EnumType.STRING)
	private BillStatus billStatus;
	
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
	
	@ManyToOne
	@JoinColumn(name = "discount_id")
	private Discount discount;
	
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private User customer;
	
	@ManyToOne
	@JoinColumn(name = "vehicle_id")
	private Vehicle vehicle;
}
