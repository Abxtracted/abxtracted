package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.ExperimentRevision;

public interface ExperimentRevisionRepository extends CrudRepository<ExperimentRevision, String> {

	@Query("select er from ExperimentRevision er where er.experiment.project.id = ?1 and er.experiment.key =?2 ")
	ExperimentRevision findByKey(String projectId, String key);
}
