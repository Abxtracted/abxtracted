package com.abxtract.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.abxtract.models.Project;

public interface ProjectRepository extends CrudRepository<Project, String> {
	@Query("select p from Project p where p.tenant.id = ?1 and p.deletedAt is null")
	List<Project> findByTenantId(String tenantId);

	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("update Project p set p.deletedAt = localtimestamp where p.tenant.id = :tenant and p.id = :id")
	void delete(@Param("tenant") String tenantId, @Param("id") String id);

	@Query("select p from Project p where p.tenant.id = ?1 and p.id = ?2")
	Project findById(String tenantId, String id);
}
