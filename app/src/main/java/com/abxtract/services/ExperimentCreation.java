package com.abxtract.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.models.Experiment;
import com.abxtract.models.ExperimentRevision;
import com.abxtract.models.Scenario;
import com.abxtract.models.SplittedScenario;
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

	public Experiment create(Experiment experiment) {
		experiment = experimentRepository.save( experiment );
		createRevisionWithScenarios( experiment );
		return experiment;
	}

	private void createRevisionWithScenarios(Experiment experiment) {
		ExperimentRevision revision = ExperimentRevision.builder().experiment( experiment ).build();
		experimentRevisionRepository.save( revision );
		createScenario( revision, "Hypothesis", "hypothesis", 50 );
		createScenario( revision, "Control", "control", 50 );

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
