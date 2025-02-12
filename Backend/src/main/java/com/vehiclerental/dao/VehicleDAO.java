package com.vehiclerental.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.User;
import com.vehiclerental.pojos.Vehicle;

public interface VehicleDAO extends JpaRepository<Vehicle, Long>{

	List<Vehicle> findAllByIsAvailable(boolean b);

	List<Vehicle> findAllByStatusTrue();

	List<Vehicle> findAllByOwner(User owner);

	List<Vehicle> findAllByOwnerAndStatusTrue(User owner);

}
