package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Customer;

public interface CustomerRepository extends CrudRepository<Customer, String> {
	@Query("select c from Customer c where c.tenant.id = ?1 and c.identity = ?2")
	Customer findByIdentity(String tenantId, String identity);
}
