package com.abxtract.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Checkpoint;

public interface CheckpointRepository extends CrudRepository<Checkpoint, String> {
}
