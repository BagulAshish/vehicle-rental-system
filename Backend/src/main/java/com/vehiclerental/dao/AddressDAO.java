package com.vehiclerental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.Address;

public interface AddressDAO extends JpaRepository<Address, Long>{

}
