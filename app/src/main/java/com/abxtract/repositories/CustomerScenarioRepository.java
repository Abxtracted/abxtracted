package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.CustomerScenario;

public interface CustomerScenarioRepository extends CrudRepository<CustomerScenario, String> {

	@Query("select count(cs.id) from CustomerScenario cs where cs.scenario.experiment.id = ?1")
	Long countByExperimentId(String experimentId);

	@Query("select count(cs.id) from CustomerScenario cs where cs.scenario.id = ?1")
	Long countByScenarioId(String experimentId);

	@Query("select count(cs.id) from CustomerScenario cs where cs.scenario.id = ?1 and exists (select 1 from CustomerCheckpoint cc where cc.customer.id = cs.customer.id and cc.checkpoint.experiment.id = cs.scenario.experiment.id)")
	Long countCompletedByScenarioId(String experimentId);

	@Query("select cs from CustomerScenario cs where cs.scenario.experiment.project.id = ?1 and cs.scenario.experiment.id = ?2 and cs.customer.identity = ?3")
	CustomerScenario findByCustomerAndExperimentRevision(String projectId, String experimentRevisionId,
			String identity);
}
