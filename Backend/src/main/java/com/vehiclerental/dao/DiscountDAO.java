package com.vehiclerental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.Discount;

public interface DiscountDAO extends JpaRepository<Discount, Long>{

	List<Discount> findAllByStatusTrue();

}
