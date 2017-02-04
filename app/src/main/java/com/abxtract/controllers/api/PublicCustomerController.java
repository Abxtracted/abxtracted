package com.abxtract.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.models.Checkpoint;
import com.abxtract.models.Customer;
import com.abxtract.models.ExperimentRevision;
import com.abxtract.models.Project;
import com.abxtract.models.Tenant;
import com.abxtract.repositories.CheckpointRepository;
import com.abxtract.repositories.CustomerRepository;
import com.abxtract.repositories.ExperimentRevisionRepository;
import com.abxtract.repositories.ProjectRepository;

@RestController
@RequestMapping(value = "/public/project/{projectId}/customer/{customerIdentity}")
public class PublicCustomerController {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private CheckpointRepository checkpointRepository;

	@Autowired
	private ExperimentRevisionRepository experimentRevisionRepository;

	@RequestMapping("experiment/{experimentKey}")
	public void raffle(@PathVariable String projectId, @PathVariable String customerIdentity,
			@PathVariable String experimentKey) {
		Project project = projectRepository.findOne( projectId );
		Tenant tenant = project.getTenant();
		Customer customer = asLocalCustomer( customerIdentity, tenant );
		ExperimentRevision experimentRevision = experimentRevisionRepository.findByKey( projectId, experimentKey );
		// TODO: raffle custmoer scenario
	}

	@RequestMapping("experiment/{experimentKey}/check/{checkpointKey}")
	public void check(@PathVariable String projectId, @PathVariable String customerIdentity,
			@PathVariable String experimentKey, @PathVariable String checkpointKey) {
		Project project = projectRepository.findOne( projectId );
		Tenant tenant = project.getTenant();
		Customer customer = asLocalCustomer( customerIdentity, tenant );
		Checkpoint checkpoint = checkpointRepository.findByKey( projectId, experimentKey, checkpointKey );
		// TODO: gravar evento
	}

	private Customer asLocalCustomer(String customerIdentity, Tenant tenant) {
		Customer customer = customerRepository.findByIdentity( tenant.getId(), customerIdentity );
		if (customer != null)
			return customer;
		else
			return customerRepository.save( Customer.builder().tenant( tenant ).identity( customerIdentity ).build() );
	}
}
