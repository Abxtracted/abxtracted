package com.abxtract.services.experiment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.dtos.ScenarioDTO;
import com.abxtract.exceptions.ExperimentNotFoundException;
import com.abxtract.exceptions.ScenarioNotFoundException;
import com.abxtract.models.Experiment;
import com.abxtract.models.ExperimentResult;
import com.abxtract.models.Scenario;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.repositories.ExperimentResultRepository;
import com.abxtract.repositories.ScenarioRepository;

@Service
public class ExperimentConclusion {

	@Autowired
	private ExperimentResultRepository experimentResultRepository;

	@Autowired
	private ScenarioRepository scenarioRepository;

	@Autowired
	private ExperimentRepository experimentRepository;

	public ExperimentResult conclude(String tenantId, String experimentId, ScenarioDTO scenarioDto) {
		Experiment experiment = experimentRepository.findByIds( tenantId, experimentId );
		if (experiment == null)
			throw new ExperimentNotFoundException( experimentId );
		Scenario scenario = scenarioRepository.findOne( scenarioDto.getId() );
		if (scenario == null)
			throw new ScenarioNotFoundException( scenario.getId() );

		return experimentResultRepository.save( new ExperimentResult( experiment, scenario ) );
	}
}
