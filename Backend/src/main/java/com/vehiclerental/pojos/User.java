package com.vehiclerental.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity{
	
	@Column(length = 20, unique = true, nullable = false)
	private String username;
	
	@Column(length = 50, unique = true, nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column(length = 20, name = "first_name")
	private String firstName;
	
	@Column(length = 20, name = "middle_name")
	private String middelName;
	
	@Column(length = 20, name = "last_name")
	private String lastName;
	
	@Column(length = 10, unique = true, name = "mobile_no")
	private String mobileNo;
	
	@Lob
	private byte[] photo;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@OneToOne
	@JoinColumn(name = "address_id")
	private Address address;
	
	@Enumerated(EnumType.STRING)
	private SecurityQuestion securityQuestion;
	
	@Column(length = 40, name = "answer")
	private String answer;
	
	
}
