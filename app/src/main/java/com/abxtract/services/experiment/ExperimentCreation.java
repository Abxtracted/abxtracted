package com.abxtract.services.experiment;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.exceptions.ValidationException;
import com.abxtract.models.Checkpoint;
import com.abxtract.models.Experiment;
import com.abxtract.models.ExperimentRevision;
import com.abxtract.models.Scenario;
import com.abxtract.models.SplittedScenario;
import com.abxtract.models.validations.Validation;
import com.abxtract.repositories.CheckpointRepository;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.repositories.ExperimentRevisionRepository;
import com.abxtract.repositories.ScenarioRepository;
import com.abxtract.repositories.SplittedScenarioRepository;

@Service
public class ExperimentCreation {

	@Autowired
	private ExperimentRepository experimentRepository;

	@Autowired
	private ExperimentRevisionRepository experimentRevisionRepository;

	@Autowired
	private ScenarioRepository scenarioRepository;

	@Autowired
	private SplittedScenarioRepository splittedScenarioRepository;

	@Autowired
	private CheckpointRepository checkpointRepository;

	public Experiment create(Experiment experiment) {
		Validation validation = new Validation( experiment );
		if (!validation.isValid())
			throw new ValidationException( validation.getErrors() );

		if (isExperimentKeyUnavailable( experiment )) {
			Map<String, String> errors = new HashMap<>();
			errors.put( "key", "has been taken" );
			throw new ValidationException( errors );
		}

		experiment = experimentRepository.save( experiment );
		createRevision( experiment );
		return experiment;

	}

	private boolean isExperimentKeyUnavailable(Experiment experiment) {
		return experimentRepository.findByProjectAndKey( experiment.getProject().getId(), experiment.getKey() ) != null;
	}

	private void createRevision(Experiment experiment) {
		ExperimentRevision revision = ExperimentRevision.builder().experiment( experiment ).build();
		experimentRevisionRepository.save( revision );
		createScenario( revision, "Hypothesis", "hypothesis", 50 );
		createScenario( revision, "Control", "control", 50 );
		createCheckpoint( revision );
	}

	private void createCheckpoint(ExperimentRevision revision) {
		Checkpoint checkpoint = Checkpoint.builder()
				.experimentRevision( revision )
				.name( "Complete" )
				.key( "complete" )
				.experimentRevision( revision )
				.build();

		checkpointRepository.save( checkpoint );
	}

	private Scenario createScenario(ExperimentRevision revision, String name, String key, Integer rate) {
		Scenario scenario = Scenario.builder()
				.experimentRevision( revision )
				.name( name )
				.key( key )
				.rate( rate )
				.build();

		int splittedRate = scenario.getRate() / 2;

		scenario = scenarioRepository.save( scenario );
		splittedScenarioRepository.save( SplittedScenario.builder()
				.scenario( scenario )
				.rate( splittedRate ).build() );
		splittedScenarioRepository.save( SplittedScenario.builder()
				.scenario( scenario )
				.rate( splittedRate ).build() );

		return scenario;
	}
}
