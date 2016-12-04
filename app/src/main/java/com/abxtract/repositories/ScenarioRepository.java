package com.abxtract.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.Scenario;

public interface ScenarioRepository extends CrudRepository<Scenario, String> {
}
