package com.abxtract.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.SplittedScenario;

public interface SplittedScenarioRepository extends CrudRepository<SplittedScenario, String> {

	@Query("select ss from SplittedScenario ss where ss.scenario.experimentRevision.id = ?1 order by ss.id")
	List<SplittedScenario> findByExperimentRevision(String experimentRevisionId);
}
