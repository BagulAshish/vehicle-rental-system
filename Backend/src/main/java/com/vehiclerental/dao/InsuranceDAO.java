package com.vehiclerental.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.Insurance;

public interface InsuranceDAO extends JpaRepository<Insurance, Long>{

}
