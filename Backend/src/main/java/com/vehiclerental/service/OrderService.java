package com.vehiclerental.service;

import java.util.List;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.dto.OrderDTO;
import com.vehiclerental.dto.OrderResponseDTO;
import com.vehiclerental.pojos.Order;

public interface OrderService {

	Long placeOrder(Long cid, Long vid, OrderDTO orderDTO);

	Order viewOrder(Long orid);

	List<OrderResponseDTO> viewAllOrdersOfCustomer(Long cid);

	ApiResponse cancelOrder(Long orid);

	List<Order> viewAllOrders();

	ApiResponse completeOrder(Long orid);

	List<OrderResponseDTO> getOrdersOfOwner(Long oid);

}
