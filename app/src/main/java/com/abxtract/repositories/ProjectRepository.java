package com.abxtract.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Project;

public interface ProjectRepository extends CrudRepository<Project, String> {
	@Query("select p from Project p where p.tenant.id = ?1 and p.deletedAt is null")
	List<Project> findByTenantId(String tenantId);

	@Modifying(clearAutomatically = true)
	@Query("update Project p set p.deletedAt = localtimestamp where p.id = ?2 and p.tenant.id = ?1")
	void delete(String tenantId, String id);

	@Query("select p from Project p where p.id = ?2 and p.tenant.id = ?1")
	Project findById(String tenantId, String id);
}
