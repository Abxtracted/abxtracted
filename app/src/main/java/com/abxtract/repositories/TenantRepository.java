package com.abxtract.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Tenant;

public interface TenantRepository extends CrudRepository<Tenant, String> {
}
