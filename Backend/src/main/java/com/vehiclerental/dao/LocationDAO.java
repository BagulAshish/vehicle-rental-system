package com.vehiclerental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.Location;

public interface LocationDAO extends JpaRepository<Location, Long>{

	List<Location> findByStatusTrue();
	
	

}
