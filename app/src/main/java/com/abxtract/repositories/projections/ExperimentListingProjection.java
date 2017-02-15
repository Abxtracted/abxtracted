package com.abxtract.repositories.projections;

import java.util.Date;

import lombok.Getter;

import com.abxtract.models.Scenario;
import com.querydsl.core.annotations.QueryProjection;

@Getter
public class ExperimentListingProjection {
	private final String id;
	private final String name;
	private final String key;
	private final Date createdAt;
	private final Date updatedAt;
	private final Date deletedAt;
	private final Scenario result;

	@QueryProjection
	public ExperimentListingProjection(String id, String name, String key, Date createdAt, Date updatedAt,
			Date deletedAt, Scenario result) {
		this.id = id;
		this.name = name;
		this.key = key;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.deletedAt = deletedAt;
		this.result = result;
	}
}
