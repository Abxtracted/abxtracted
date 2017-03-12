package com.abxtract.services.experiment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.dtos.ScenarioDTO;
import com.abxtract.exceptions.NotFoundException;
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
			throw new NotFoundException( "Experiment not found!" );
		Scenario scenario = scenarioRepository.findOne( scenarioDto.getId() );
		if (scenario == null)
			throw new NotFoundException( "Scenario not found!" );

		return experimentResultRepository.save( new ExperimentResult( experiment, scenario ) );
	}
}
