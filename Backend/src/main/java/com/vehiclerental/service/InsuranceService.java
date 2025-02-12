package com.vehiclerental.service;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.pojos.Insurance;

public interface InsuranceService{

	ApiResponse AddInsurance(Long vid, Insurance insurance);

}
