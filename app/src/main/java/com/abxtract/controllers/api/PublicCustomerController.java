package com.abxtract.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.dtos.CustomerScenarioDTO;
import com.abxtract.models.Checkpoint;
import com.abxtract.models.Customer;
import com.abxtract.models.CustomerCheckpoint;
import com.abxtract.models.CustomerScenario;
import com.abxtract.models.ExperimentRevision;
import com.abxtract.models.Project;
import com.abxtract.models.SplittedScenario;
import com.abxtract.models.Tenant;
import com.abxtract.repositories.CheckpointRepository;
import com.abxtract.repositories.CustomerCheckpointRepository;
import com.abxtract.repositories.CustomerRepository;
import com.abxtract.repositories.CustomerScenarioRepository;
import com.abxtract.repositories.ExperimentRevisionRepository;
import com.abxtract.repositories.ProjectRepository;
import com.abxtract.repositories.SplittedScenarioRepository;

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

	@Autowired
	private CustomerScenarioRepository customerScenarioRepository;

	@Autowired
	private SplittedScenarioRepository splittedScenarioRepository;

	@Autowired
	private CustomerCheckpointRepository customerCheckpointRepository;

	@RequestMapping("experiment/{experimentKey}")
	public CustomerScenarioDTO raffle(@PathVariable String projectId, @PathVariable String customerIdentity,
			@PathVariable String experimentKey) {
		Project project = projectRepository.findOne( projectId );
		Tenant tenant = project.getTenant();
		Customer customer = asLocalCustomer( customerIdentity, tenant );
		ExperimentRevision experimentRevision = experimentRevisionRepository
				.findLastRevisionAndKey( projectId, experimentKey );
		CustomerScenario customerScenario = customerScenarioRepository.findByCustomerAndExperimentRevision( projectId,
				experimentRevision.getId(), customerIdentity );
		if (customerScenario != null)
			return new CustomerScenarioDTO( customerScenario );
		else
			return new CustomerScenarioDTO( raffleScenario( experimentRevision, customer ) );
	}

	private CustomerScenario raffleScenario(ExperimentRevision experimentRevision, Customer customer) {
		List<SplittedScenario> scenarios = splittedScenarioRepository
				.findByExperimentRevision( experimentRevision.getId() );
		Long usersOnExperiment = customerScenarioRepository
				.countByExperimentId( experimentRevision.getExperiment().getId() );

		Integer nextScenario = Math.toIntExact( usersOnExperiment % scenarios.size() );
		CustomerScenario customerScenario = CustomerScenario.builder()
				.customer( customer )
				.splittedScenario( scenarios.get( nextScenario ) ).build();
		customerScenarioRepository.save( customerScenario );
		return customerScenario;
	}

	@RequestMapping("experiment/{experimentKey}/check/{checkpointKey}")
	public void check(@PathVariable String projectId, @PathVariable String customerIdentity,
			@PathVariable String experimentKey, @PathVariable String checkpointKey) {
		Project project = projectRepository.findOne( projectId );
		Tenant tenant = project.getTenant();
		Customer customer = asLocalCustomer( customerIdentity, tenant );
		ExperimentRevision experimentRevision = experimentRevisionRepository
				.findLastRevisionAndKey( projectId, experimentKey );
		Checkpoint checkpoint = checkpointRepository
				.findExperimentRevisionAndKey( projectId, experimentRevision.getId(), checkpointKey );
		if (checkpoint != null && experimentRevision != null) {
			CustomerCheckpoint customerCheckpoint = CustomerCheckpoint.builder()
					.checkpoint( checkpoint )
					.customer( customer ).build();
			customerCheckpointRepository.save( customerCheckpoint );
		}
	}

	private Customer asLocalCustomer(String customerIdentity, Tenant tenant) {
		Customer customer = customerRepository.findByIdentity( tenant.getId(), customerIdentity );
		if (customer != null)
			return customer;
		else
			return customerRepository.save( Customer.builder().tenant( tenant ).identity( customerIdentity ).build() );
	}
}
