package com.abxtract.repositories;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;

import com.abxtract.models.QExperiment;
import com.abxtract.models.QExperimentResult;
import com.abxtract.repositories.projections.ExperimentListingProjection;
import com.abxtract.repositories.projections.QExperimentListingProjection;
import com.querydsl.jpa.impl.JPAQuery;

public class ExperimentRepositoryImpl implements ExperimentsQueries {

	private static final QExperiment EXPERIMENT = QExperiment.experiment;
	private static final QExperimentResult EXPERIMENT_RESULT = QExperimentResult.experimentResult;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<ExperimentListingProjection> findByProjectId(String tenantId, String projectId) {
		QExperimentListingProjection projection = new QExperimentListingProjection(
				EXPERIMENT.id,
				EXPERIMENT.name,
				EXPERIMENT.key,
				EXPERIMENT.createdAt,
				EXPERIMENT.updatedAt,
				EXPERIMENT.deletedAt,
				EXPERIMENT_RESULT.scenario,
				EXPERIMENT.project );
		return new JPAQuery<ExperimentListingProjection>( entityManager )
				.select( projection )
				.from( EXPERIMENT_RESULT )
				.rightJoin( EXPERIMENT_RESULT.experiment, EXPERIMENT )
				.leftJoin( EXPERIMENT_RESULT.scenario )
				.where(
						EXPERIMENT.project.tenant.id.eq( tenantId ),
						EXPERIMENT.project.id.eq( projectId ),
						EXPERIMENT.deletedAt.isNull()
				).fetch();
	}
}
