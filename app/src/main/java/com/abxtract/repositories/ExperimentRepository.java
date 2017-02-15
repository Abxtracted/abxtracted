package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Experiment;

public interface ExperimentRepository extends CrudRepository<Experiment, String>, ExperimentsQueries {

	@Override
	@Modifying(clearAutomatically = true)
	@Query("update Experiment e set e.deletedAt = localtimestamp where e.id = ?1")
	void delete(String id);

	@Query("select e from Experiment e where project_id = ?1 and key = ?2")
	Experiment findByProjectAndKey(String projectId, String key);
}
