package com.vehiclerental.service;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.dao.LocationDAO;
import com.vehiclerental.dao.OrderDAO;
import com.vehiclerental.dao.UserDAO;
import com.vehiclerental.dao.VehicleDAO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.OrderDTO;
import com.vehiclerental.dto.OrderResponseDTO;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.Location;
import com.vehiclerental.pojos.Order;
import com.vehiclerental.pojos.User;
import com.vehiclerental.pojos.Vehicle;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderDAO orderDAO;
	
	@Autowired
	private VehicleDAO vehicleDAO;
	
	@Autowired
	private UserDAO customerDAO;
	
	@Autowired
	private LocationDAO locationDAO;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Long placeOrder(Long cid, Long vid, OrderDTO orderDTO) {
		Order order = modelMapper.map(orderDTO, Order.class);
		User customer = customerDAO.findById(cid).orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
		Vehicle vehicle = vehicleDAO.findById(vid).orElseThrow(() -> new ResourceNotFoundException("Vehicle Not Found"));
		Location pickUpLocation = locationDAO.findById(orderDTO.getPickUpLocation()).orElseThrow(() -> new ResourceNotFoundException("Location Not Found"));
		Location dropLocation = locationDAO.findById(orderDTO.getDropLocation()).orElseThrow(() -> new ResourceNotFoundException("Location Not Found"));
		User owner = vehicle.getOwner();
		order.setCustomer(customer);
		order.setOwner(owner);
		order.setVehicle(vehicle);
		order.setPickUpLocation(pickUpLocation);
		order.setDropLocation(dropLocation);
		order.setPickUpTime(LocalDateTime.parse(orderDTO.getPickUpDateTime()));
        order.setDropTime(LocalDateTime.parse(orderDTO.getDropDateTime()));
		Order o = orderDAO.save(order);
		return o.getId();
	}

	@Override
	public Order viewOrder(Long orid) {
		Order order = orderDAO.findById(orid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		return order;
	}

	@Override
	public List<OrderResponseDTO> viewAllOrdersOfCustomer(Long cid) {
		User customer = customerDAO.findById(cid).orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
		List<Order> ordersList = orderDAO.findByCustomerAndStatusTrue(customer);
		List<OrderResponseDTO> orderDTOList = ordersList.stream().map(order -> modelMapper.map(order, OrderResponseDTO.class)).toList();
		return orderDTOList;
	}

	@Override
	public ApiResponse cancelOrder(Long orid) {
		Order order = orderDAO.findById(orid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		order.setStatus(false);
		return new ApiResponse("Order with id " + order.getId() + " is cancelled");
	}

	@Override
	public List<Order> viewAllOrders() {
		return orderDAO.findAll();
	}

	@Override
	public ApiResponse completeOrder(Long orid) {
		Order order = orderDAO.findById(orid).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		Vehicle vehicle = order.getVehicle();
		vehicle.setAvailable(true);
		return new ApiResponse("Order " + order.getId() + " is completed");
	}

	@Override
	public List<OrderResponseDTO> getOrdersOfOwner(Long oid) {
		User owner = customerDAO.findById(oid).orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
		List<Order> ordersList = orderDAO.findByOwnerAndStatusTrue(owner);
		List<OrderResponseDTO> orderDTOList = ordersList.stream().map(order -> modelMapper.map(order, OrderResponseDTO.class)).toList();
		return orderDTOList;
	}

}
