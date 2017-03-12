package com.abxtract.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.exceptions.ProjectNotFoundException;
import com.abxtract.exceptions.ValidationException;
import com.abxtract.models.Project;
import com.abxtract.models.User;
import com.abxtract.models.validations.Validation;
import com.abxtract.repositories.ProjectRepository;

@RestController
@RequestMapping(value = "/projects", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<Project> list(@RequestAttribute("tenant_id") String tenantId) {
		return projectRepository.findByTenantId( tenantId );
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Project create(@RequestAttribute("user") User user, @RequestBody Project project)
			throws ValidationException {
		project.setTenant( user.getTenant() );
		Validation validation = new Validation( project );
		if (validation.isValid())
			return projectRepository.save( project );
		else
			throw new ValidationException( validation.getErrors() );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public Project findById(@RequestAttribute("tenant_id") String tenantId, @PathVariable String id) {
		final Project project = projectRepository.findById( tenantId, id );
		if (project == null)
			throw new ProjectNotFoundException( id );
		return project;
	}

	@RequestMapping(value = "{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Project update(
			@RequestAttribute("tenant_id") String tenantId,
			@PathVariable String id,
			@RequestBody Project project
	) throws ValidationException {
		if (!project.getTenant().getId().equals( tenantId ))
			throw new ProjectNotFoundException( id );
		project.setId( id );
		Validation validation = new Validation( project );
		if (validation.isValid())
			return projectRepository.save( project );
		else
			throw new ValidationException( validation.getErrors() );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void delete(@RequestAttribute("tenant_id") String tenantId, @PathVariable String id) {
		projectRepository.delete( tenantId, id );
	}
}
