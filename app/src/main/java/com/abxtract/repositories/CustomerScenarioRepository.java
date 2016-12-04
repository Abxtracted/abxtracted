package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.CustomerScenario;

public interface CustomerScenarioRepository extends CrudRepository<CustomerScenario, String> {

	@Query("select count(cs.id) from CustomerScenario cs where cs.splittedScenario.scenario.experimentRevision.experiment.id = ?1")
	Long countByExperimentId(String experimentId);


}
