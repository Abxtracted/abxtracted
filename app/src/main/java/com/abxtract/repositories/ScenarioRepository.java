package com.abxtract.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Scenario;

public interface ScenarioRepository extends CrudRepository<Scenario, String> {

	@Query("select s from Scenario s where s.experiment.id = ?1")
	List<Scenario> findByExperimentId(String experimentId);
}
