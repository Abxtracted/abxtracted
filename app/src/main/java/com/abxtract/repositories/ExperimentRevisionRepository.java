package com.abxtract.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.ExperimentRevision;

public interface ExperimentRevisionRepository extends CrudRepository<ExperimentRevision, String> {
}
