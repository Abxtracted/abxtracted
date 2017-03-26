package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.abxtract.models.Experiment;

public interface ExperimentRepository extends CrudRepository<Experiment, String>, ExperimentsQueries {

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update Experiment e set e.deletedAt = localtimestamp where e.project.id = :project and e.id = :id")
	void delete(@Param( "project" ) String projectId, @Param( "id" ) String id);

	@Query("select e from Experiment e where project_id = ?1 and key = ?2")
	Experiment findByProjectAndKey(String projectId, String key);

	@Query("select e from Experiment e where e.id = ?2 and e.project.tenant.id = ?1")
	Experiment findByIds(String tenantId, String experimentId);
}
