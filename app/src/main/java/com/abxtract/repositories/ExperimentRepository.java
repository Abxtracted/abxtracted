package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Experiment;

public interface ExperimentRepository extends CrudRepository<Experiment, String>, ExperimentsQueries {

	@Modifying(clearAutomatically = true)
	@Query("update Experiment e set e.deletedAt = localtimestamp where project_id = ?1 and e.id = ?2")
	void delete(String tenantId, String id);

	@Query("select e from Experiment e where project_id = ?1 and key = ?2")
	Experiment findByProjectAndKey(String projectId, String key);
}
