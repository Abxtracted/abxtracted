package com.abxtract.services.experiment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.dtos.ExperimentResultDTO;
import com.abxtract.models.Experiment;
import com.abxtract.repositories.CustomerScenarioRepository;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.services.experiment.statistics.Confidence;
import com.abxtract.services.experiment.statistics.MarginOfErrorCalculation;
import com.abxtract.services.experiment.statistics.SampleSizeCalculation;

@Service
public class ExperimentDataCalculation {

	@Autowired
	private CustomerScenarioRepository customerScenarioRepository;

	@Autowired
	private ExperimentRepository experimentRepository;

	public ExperimentResultDTO sumarize(String experimentId) {
		Experiment experiment = experimentRepository.findOne( experimentId );
		Long sampleSize = customerScenarioRepository.countByExperimentId( experimentId );
		Double confidence = Confidence.CONFIDENCE_95;
		Double expectedProportion = 0.5;
		Double minSampleSize = new SampleSizeCalculation( confidence,
				expectedProportion, 0.02 ).calculate();
		Double marginOfError = new MarginOfErrorCalculation( confidence,
				expectedProportion, sampleSize.doubleValue() ).calculate();

		ExperimentResultDTO experimentResult = new ExperimentResultDTO( experiment.getName(),
				sampleSize, minSampleSize, true, marginOfError, null );

		return experimentResult;
	}

	public void loadVersions(String experimentId, ExperimentResultDTO experimentResultDTO) {
	}
}
