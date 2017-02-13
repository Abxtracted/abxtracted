package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Checkpoint;

public interface CheckpointRepository extends CrudRepository<Checkpoint, String> {
	@Query("select c from Checkpoint c where c.experiment.project.id = ?1 and c.experiment.id = ?2 and c.key = ?3")
	Checkpoint findExperimentRevisionAndKey(String projectId, String experimentId, String key);
}
