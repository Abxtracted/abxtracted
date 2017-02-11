package com.abxtract.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "checkpoints",
		uniqueConstraints = { @UniqueConstraint(name = "idx_unique_checkpoints_key_experiment",
				columnNames = { "key", "experiment_id" }) })
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Checkpoint extends Model {
	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	private String id;

	@ManyToOne
	private Experiment experiment;

	private String name;

	private String key;
}
