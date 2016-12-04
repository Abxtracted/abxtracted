package com.abxtract.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.dtos.ExperimentResultDTO;
import com.abxtract.exceptions.ValidationException;
import com.abxtract.models.Experiment;
import com.abxtract.models.Project;
import com.abxtract.models.validations.Validation;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.repositories.ProjectRepository;
import com.abxtract.services.experiment.ExperimentCreation;
import com.abxtract.services.experiment.ExperimentDataCalculation;

@RestController
@RequestMapping(value = "/projects/{projectId}/experiments", produces = MediaType.APPLICATION_JSON_VALUE)
public class ExperimentController {

	@Autowired
	private ExperimentRepository experimentRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private ExperimentCreation experimentCreation;

	@Autowired
	private ExperimentDataCalculation experimentDataCalculation;

	@RequestMapping(method = RequestMethod.GET)
	public List<Experiment> list(@PathVariable String projectId) {
		return experimentRepository.findByProjectId( projectId );
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Experiment create(@PathVariable String projectId, @RequestBody Experiment experiment)
			throws ValidationException {
		Project project = projectRepository.findOne( projectId );
		experiment.setProject( project );

		Validation validation = new Validation( experiment );
		if (validation.isValid()) {
			return experimentCreation.create( experiment );
		} else
			throw new ValidationException( validation.getErrors() );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public ExperimentResultDTO findById(@PathVariable String id) {
		return experimentDataCalculation.sumarize( id );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
		experimentRepository.delete( id );
	}
}
