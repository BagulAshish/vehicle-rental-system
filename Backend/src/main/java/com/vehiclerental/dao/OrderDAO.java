package com.vehiclerental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.Order;
import com.vehiclerental.pojos.User;

public interface OrderDAO extends JpaRepository<Order, Long>{

	List<Order> findByCustomer(User customer);

	List<Order> findByCustomerAndStatusTrue(User customer);

	List<Order> findByOwnerAndStatusTrue(User owner);

}
