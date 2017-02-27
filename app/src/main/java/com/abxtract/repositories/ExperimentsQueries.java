package com.abxtract.repositories;

import java.util.List;

import com.abxtract.repositories.projections.ExperimentListingProjection;

public interface ExperimentsQueries {

	List<ExperimentListingProjection> findByProjectId(String id);
}
