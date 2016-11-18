package com.abxtract.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends Model {

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	private Long id;

	@NotNull
	@Column(unique = true)
	private String email;

	@NotNull
	private String password;

	@ManyToOne
	private Tenant tenant;
}
