package com.abxtract.services.experiment;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.dtos.ExperimentResultDTO;
import com.abxtract.models.Experiment;
import com.abxtract.models.Scenario;
import com.abxtract.repositories.CustomerScenarioRepository;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.repositories.ScenarioRepository;
import com.abxtract.services.experiment.statistics.Confidence;
import com.abxtract.services.experiment.statistics.MarginOfErrorCalculation;
import com.abxtract.services.experiment.statistics.SampleSizeCalculation;
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

	public ExperimentResultDTO sumarize(String experimentId) {
		Experiment experiment = experimentRepository.findOne( experimentId );
		Long sampleSize = customerScenarioRepository.countByExperimentId( experimentId );
		Double confidence = Confidence.CONFIDENCE_95;
		Double expectedProportion = 0.5;
		Double minSampleSize = new SampleSizeCalculation( confidence,
				expectedProportion, 0.02 ).calculate();
		Double marginOfError = new MarginOfErrorCalculation( confidence,
				expectedProportion, sampleSize.doubleValue() ).calculate();

		List<ExperimentResultDTO.ScenarioResult> scenarios = retrieveVersions( experimentId );
		SimpleChiSquare chiSquareCalculator = new SimpleChiSquare();
		Double chiSquare = chiSquareCalculator.calculate( scenarios.get( 0 ).getSampleSize(),
				scenarios.get( 0 ).getConverted(),
				scenarios.get( 1 ).getSampleSize(),
				scenarios.get( 1 ).getConverted() );

		Double pValue = new SimplePValue().fromChiSquare( chiSquare );

		return ExperimentResultDTO.builder()
				.name( experiment.getName() )
				.sampleSize( sampleSize )
				.minSampleSize( minSampleSize )
				.marginOfError( marginOfError )
				.chiSquare( chiSquare )
				.pValue( pValue )
				.scenarios( scenarios )
				.build();
	}

	public List<ExperimentResultDTO.VersionResult> retrieveVersions(String experimentId) {
		List<Scenario> scenarios = scenarioRepository.findByExperimentId( experimentId );

		return scenarios.stream().map( this::buildVersionResult ).collect( Collectors.toList() );
	}

	private ExperimentResultDTO.VersionResult buildVersionResult(Scenario scenario) {
		Long sampleSize = customerScenarioRepository.countByScenarioId( scenario.getId() );
		Long converted = customerScenarioRepository.countCompletedByScenarioId( scenario.getId() );
		return new ExperimentResultDTO.VersionResult( scenario.getId(), scenario.getName(), sampleSize, converted );
	}
}
