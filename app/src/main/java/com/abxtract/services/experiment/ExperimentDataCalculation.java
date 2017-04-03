package com.abxtract.services.experiment;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.dtos.ExperimentStatus;
import com.abxtract.dtos.ExperimentViewDTO;
import com.abxtract.dtos.ScenarioDTO;
import com.abxtract.exceptions.ExperimentNotFoundException;
import com.abxtract.models.Experiment;
import com.abxtract.models.ExperimentResult;
import com.abxtract.models.Scenario;
import com.abxtract.repositories.CustomerScenarioRepository;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.repositories.ExperimentResultRepository;
import com.abxtract.repositories.ScenarioRepository;
import com.abxtract.services.experiment.statistics.Confidence;
import com.abxtract.services.experiment.statistics.MarginOfErrorCalculation;
import com.abxtract.services.experiment.statistics.SimpleChiSquare;
import com.abxtract.services.experiment.statistics.SimplePValue;

@Service
public class ExperimentDataCalculation {

	@Autowired
	private CustomerScenarioRepository customerScenarioRepository;

	@Autowired
	private ExperimentRepository experimentRepository;

	@Autowired
	private ScenarioRepository scenarioRepository;

	@Autowired
	private ExperimentResultRepository experimentResultRepository;

	public ExperimentViewDTO sumarize(String tenantId, String experimentId) {
		Experiment experiment = experimentRepository.findByIds( tenantId, experimentId );
		if (experiment == null)
			throw new ExperimentNotFoundException( experimentId );
		Long sampleSize = customerScenarioRepository.countByExperimentId( experimentId );
		ExperimentResult result = experimentResultRepository.findByExperimentId( experimentId );
		ScenarioDTO winnerScenario = result != null ? new ScenarioDTO( result.getScenario() ) : null;

		Double confidence = Confidence.CONFIDENCE_95;
		Double expectedProportion = 0.5;
		Double marginOfError = new MarginOfErrorCalculation( confidence,
				expectedProportion, sampleSize.doubleValue() ).calculate();

		List<ExperimentViewDTO.ScenarioResult> scenarios = retrieveVersions( experimentId );

		Double chiSquare = new SimpleChiSquare().calculate( scenarios.get( 0 ).getSampleSize(),
				scenarios.get( 0 ).getConverted(),
				scenarios.get( 1 ).getSampleSize(),
				scenarios.get( 1 ).getConverted() );

		Double pValue = new SimplePValue().fromChiSquare( chiSquare );

		ExperimentStatus status = calcStatus( pValue, marginOfError, scenarios.get( 0 ).getRate(),
				scenarios.get( 1 ).getRate() );

		return ExperimentViewDTO.builder()
				.name( experiment.getName() )
				.sampleSize( sampleSize )
				.marginOfError( marginOfError )
				.chiSquare( chiSquare )
				.pValue( pValue )
				.scenarios( scenarios )
				.result( winnerScenario )
				.project( experiment.getProject() )
				.status( status.name().toLowerCase() )
				.build();
	}

	private ExperimentStatus calcStatus(Double pValue, Double marginOfError, Double firstRate, Double secondRate) {
		boolean isValidRate = firstRate > (marginOfError + secondRate) || secondRate > (marginOfError + firstRate);
		if (pValue <= 0.05 && marginOfError < 0.025)
			if (isValidRate)
				return ExperimentStatus.VALID;
			else
				return ExperimentStatus.INVALID;
		return ExperimentStatus.TESTING;
	}

	private List<ExperimentViewDTO.ScenarioResult> retrieveVersions(String experimentId) {
		List<Scenario> scenarios = scenarioRepository.findByExperimentId( experimentId );

		return scenarios.stream().map( this::buildVersionResult ).collect( Collectors.toList() );
	}

	private ExperimentViewDTO.ScenarioResult buildVersionResult(Scenario scenario) {
		Long sampleSize = customerScenarioRepository.countByScenarioId( scenario.getId() );
		Long converted = customerScenarioRepository.countCompletedByScenarioId( scenario.getId() );
		Double rate = converted.doubleValue() / sampleSize.doubleValue();
		return new ExperimentViewDTO.ScenarioResult( scenario.getId(), scenario.getName(),
				sampleSize, converted, rate );
	}
}
