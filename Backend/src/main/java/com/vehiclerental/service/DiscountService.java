package com.vehiclerental.service;

import java.util.List;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.pojos.Discount;

public interface DiscountService {

	ApiResponse AddDiscount(Discount discount);

	List<Discount> getAllDiscounts();

	ApiResponse deleteDiscounts(Long did);

	Discount getDiscountById(Long did);

	ApiResponse updateDiscount(Long did, Discount discount);

}
