package com.abxtract.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.CustomerCheckpoint;

public interface CustomerCheckpointRepository extends CrudRepository<CustomerCheckpoint, String> {
}
