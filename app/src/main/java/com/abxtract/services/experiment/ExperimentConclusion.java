package com.abxtract.services.experiment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.models.Experiment;
import com.abxtract.models.ExperimentResult;
import com.abxtract.models.Scenario;
import com.abxtract.repositories.ExperimentResultRepository;

@Service
public class ExperimentConclusion {

	@Autowired
	private ExperimentResultRepository experimentResultRepository;

	private ExperimentResult conclude(Experiment experiment, Scenario scenario) {

	}
}
