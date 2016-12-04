package com.abxtract.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Experiment;

public interface ExperimentRepository extends CrudRepository<Experiment, String> {
	@Query("select e from Experiment e where e.project.id = ?1 and e.deletedAt is null")
	List<Experiment> findByProjectId(String id);

	@Override
	@Modifying(clearAutomatically = true)
	@Query("update Experiment e set e.deletedAt = localtimestamp where e.id = ?1")
	void delete(String id);
}
