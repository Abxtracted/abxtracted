package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.ExperimentResult;

public interface ExperimentResultRepository extends CrudRepository<ExperimentResult, String> {
	@Query("select er ExperimentResult")
	ExperimentResult findByExperimentId(String experimentId);
}
