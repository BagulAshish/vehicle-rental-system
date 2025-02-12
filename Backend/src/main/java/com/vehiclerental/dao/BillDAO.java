package com.vehiclerental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.Billing;

public interface BillDAO extends JpaRepository<Billing, Long>{

}
