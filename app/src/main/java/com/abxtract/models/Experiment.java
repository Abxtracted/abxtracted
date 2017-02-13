package com.abxtract.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "experiments",
		uniqueConstraints = { @UniqueConstraint(name = "idx_unique_experiments_key_project",
				columnNames = { "key", "project_id" }) })
@Getter
@Setter
public class Experiment extends Model {

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	private String id;

	@ManyToOne
	private Project project;

	@NotBlank
	private String name;

	@NotBlank
	private String key;
}
