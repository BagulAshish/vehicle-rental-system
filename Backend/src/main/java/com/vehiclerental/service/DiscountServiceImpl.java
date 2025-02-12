package com.vehiclerental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vehiclerental.dao.DiscountDAO;
import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.exceptions.ResourceNotFoundException;
import com.vehiclerental.pojos.Discount;

@Service
@Transactional
public class DiscountServiceImpl implements DiscountService {
	
	@Autowired
	private DiscountDAO discountDAO;


	
	@Override
	public ApiResponse AddDiscount(Discount discount) {
		Discount dis = discountDAO.save(discount);
		return new ApiResponse("Discount Added with ID " + dis.getId());
	}



	@Override
	public List<Discount> getAllDiscounts() {
		List<Discount> discounts = discountDAO.findAllByStatusTrue();
		return discounts;
	}



	@Override
	public ApiResponse deleteDiscounts(Long did) {
		Discount discount = discountDAO.findById(did).orElseThrow(() -> new ResourceNotFoundException("Discount Not Found"));
		discount.setStatus(false);
		discountDAO.save(discount);
		return new ApiResponse("Discount Deleted with ID " + discount.getId());
	}



	@Override
	public Discount getDiscountById(Long did) {
		Discount discount = discountDAO.findById(did).orElseThrow(() -> new ResourceNotFoundException("Discount Not Found"));
		return discount;
	}



	@Override
	public ApiResponse updateDiscount(Long did, Discount discount) {
		discount.setId(did);
		discountDAO.save(discount);
		return new ApiResponse("Discount Updated with ID " + discount.getId());
	}

}
