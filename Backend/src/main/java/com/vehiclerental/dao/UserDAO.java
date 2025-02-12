package com.vehiclerental.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehiclerental.pojos.Role;
import com.vehiclerental.pojos.User;

public interface UserDAO extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);

	List<User> findByRole(Role role);

	User findByEmail(String email);
}
