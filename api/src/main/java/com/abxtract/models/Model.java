package com.abxtract.models;

import java.util.Date;

import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class Model {

	private Date createdAt;

	private Date updatedAt;

	@PrePersist
	private void beforePersist() {
		createdAt = new Date();
		updatedAt = createdAt;
	}

	@PreUpdate
	private void beforeUpdate() {
		updatedAt = new Date();
	}
}