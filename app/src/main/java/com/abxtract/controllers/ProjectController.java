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

import com.abxtract.exceptions.ValidationException;
import com.abxtract.models.Project;
import com.abxtract.models.Tenant;
import com.abxtract.models.User;
import com.abxtract.models.validations.Validation;
import com.abxtract.repositories.ProjectRepository;
import com.abxtract.services.UserService;

@RestController
@RequestMapping(value = "/projects", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectController {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Project> list(@RequestAttribute("user") User user) {
		Tenant tenant = user.getTenant();
		return projectRepository.findByTenantId( tenant.getId() );
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Project create(@RequestAttribute("user") User user, @RequestBody Project project)
			throws ValidationException {
		Tenant tenant = user.getTenant();
		project.setTenant( tenant );
		Validation validation = new Validation( project );
		if (validation.isValid())
			return projectRepository.save( project );
		else
			throw new ValidationException( validation.getErrors() );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public Project findById(@PathVariable String id) {
		return projectRepository.findOne( id );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Project update(@PathVariable String id, @RequestBody Project project) throws ValidationException {
		project.setId( id );
		Validation validation = new Validation( project );
		if (validation.isValid())
			return projectRepository.save( project );
		else
			throw new ValidationException( validation.getErrors() );
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
		projectRepository.delete( id );
	}
}
