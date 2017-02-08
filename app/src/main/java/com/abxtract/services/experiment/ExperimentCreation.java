package com.abxtract.services.experiment;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.exceptions.ValidationException;
import com.abxtract.models.Checkpoint;
import com.abxtract.models.Experiment;
import com.abxtract.models.Scenario;
import com.abxtract.models.validations.Validation;
import com.abxtract.repositories.CheckpointRepository;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.repositories.ScenarioRepository;

@Service
public class ExperimentCreation {

	@Autowired
	private ExperimentRepository experimentRepository;
	
	@Autowired
	private ScenarioRepository scenarioRepository;

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
		createScenario( experiment, "Hypothesis", "hypothesis", 50 );
		createScenario( experiment, "Control", "control", 50 );
		createCheckpoint( experiment );
		return experiment;

	}

	private boolean isExperimentKeyUnavailable(Experiment experiment) {
		return experimentRepository.findByProjectAndKey( experiment.getProject().getId(), experiment.getKey() ) != null;
	}

	private void createCheckpoint(Experiment experiment) {
		Checkpoint checkpoint = Checkpoint.builder()
				.name( "Complete" )
				.key( "complete" )
				.experiment( experiment )
				.build();

		checkpointRepository.save( checkpoint );
	}

	private Scenario createScenario(Experiment experiment, String name, String key, Integer rate) {
		Scenario scenario = Scenario.builder()
				.experiment( experiment )
				.name( name )
				.key( key )
				.rate( rate )
				.build();

		scenario = scenarioRepository.save( scenario );
		return scenario;
	}
}
