package com.abxtract.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.dtos.ExperimentListingDTO;
import com.abxtract.dtos.ExperimentViewDTO;
import com.abxtract.dtos.ScenarioDTO;
import com.abxtract.exceptions.ProjectNotFoundException;
import com.abxtract.exceptions.ValidationException;
import com.abxtract.models.Experiment;
import com.abxtract.models.Project;
import com.abxtract.repositories.ExperimentRepository;
import com.abxtract.repositories.ProjectRepository;
import com.abxtract.services.experiment.ExperimentConclusion;
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

	@Autowired
	private ExperimentConclusion experimentConclusion;

	@RequestMapping(method = RequestMethod.GET)
	public List<ExperimentListingDTO> list(@RequestAttribute("tenant_id") String tenantId,
			@PathVariable String projectId) {
		return experimentRepository.findByProjectId( tenantId, projectId ).
				stream().
				map( ExperimentListingDTO::new ).
				collect( Collectors.toList() );
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Experiment create(@RequestAttribute("tenant_id") String tenantId, @PathVariable String projectId,
			@RequestBody Experiment experiment)
			throws ValidationException {
		Project project = projectRepository.findById( tenantId, projectId );
		if (project == null)
			throw new ProjectNotFoundException( projectId );
		experiment.setProject( project );

		return experimentCreation.create( experiment );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public ExperimentViewDTO findById(@RequestAttribute("tenant_id") String tenantId, @PathVariable String id) {
		return experimentDataCalculation.sumarize( tenantId, id );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void delete(@RequestAttribute("tenant_id") String tenantId, @PathVariable String id) {
		experimentRepository.delete( tenantId, id );
	}

	@RequestMapping(value = "{id}/conclude", method = RequestMethod.POST)
	public void conclude(@RequestAttribute("tenant_id") String tenantId, @PathVariable String id,
			@RequestBody ScenarioDTO result) {
		experimentConclusion.conclude( tenantId, id, result );
	}

}
