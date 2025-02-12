package com.vehiclerental.service;

import com.vehiclerental.dto.ApiResponse;
import com.vehiclerental.pojos.Billing;

public interface BillService {

	Billing getBill(Long cid, Long orid, Long did);

	ApiResponse payBill(Long bid);

}
