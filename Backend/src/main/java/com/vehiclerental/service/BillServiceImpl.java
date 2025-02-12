package com.vehiclerental.service;

import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.dao.BillDAO;
import com.vehiclerental.dao.DiscountDAO;
import com.vehiclerental.dao.OrderDAO;
import com.vehiclerental.dao.UserDAO;
import com.vehiclerental.dao.VehicleDAO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.BillStatus;
import com.vehiclerental.pojos.Billing;
import com.vehiclerental.pojos.Discount;
import com.vehiclerental.pojos.Order;
import com.vehiclerental.pojos.User;
import com.vehiclerental.pojos.Vehicle;

@Service
@Transactional
public class BillServiceImpl implements BillService{
	
	@Autowired
	private UserDAO customerDAO;
	@Autowired
	private OrderDAO orderDAO;
	@Autowired
	private DiscountDAO discountDAO;
	@Autowired
	private BillDAO billDAO;
	@Autowired
	private VehicleDAO vehicleDAO;

	@Override
	public Billing getBill(Long cid, Long orid, Long did) {
		Billing bill = new Billing();
		Order order = orderDAO.findById(orid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		Vehicle vehicle = order.getVehicle();
		User customer = customerDAO.findById(cid).orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
		Discount discount = discountDAO.findById(did).orElseThrow(() -> new ResourceNotFoundException("Discount Not Found"));
		bill.setVehicle(vehicle);
		bill.setCustomer(customer);
		bill.setDiscount(discount);
		bill.setOrder(order);
		double rentHours = (order.getDropTime().toEpochSecond(ZoneOffset.UTC) - order.getPickUpTime().toEpochSecond(ZoneOffset.UTC))/3600;
		bill.setRentHours(rentHours);
		double totalRentAmount = vehicle.getCostPerHour() * rentHours;
		bill.setTotalRentAmount(totalRentAmount);
		double x= totalRentAmount * 1.18;
		double dis = x * discount.getPercentage() /100;
		double totalAmount = x -dis ;
		bill.setTotalAmount(totalAmount);
		bill.setBillStatus(BillStatus.DUE);
		billDAO.save(bill);
		order.setBilling(bill);
		return bill;
	}

	@Override
	public ApiResponse payBill(Long bid) {
		Billing bill = billDAO.findById(bid).orElseThrow(() -> new ResourceNotFoundException("Bill Not Found"));
		bill.setBillStatus(BillStatus.PAID);
		Order order = bill.getOrder();
		Vehicle vehicle = order.getVehicle();
		vehicle.setAvailable(false);
		vehicleDAO.save(vehicle);
		billDAO.save(bill);
		return new ApiResponse("Bill Paid With Id " + bill.getId());
	}

	
}
