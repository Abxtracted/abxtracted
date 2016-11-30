package com.abxtract.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Project;

public interface ProjectRepository extends CrudRepository<Project, String> {
	@Query("select p from Project p where p.tenant.id = ?1")
	List<Project> findByTenantId(String tenantId);
}
