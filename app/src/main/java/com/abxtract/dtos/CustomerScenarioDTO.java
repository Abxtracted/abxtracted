package com.abxtract.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import com.abxtract.models.CustomerScenario;

@Getter
@Builder
@AllArgsConstructor
public class CustomerScenarioDTO {
	private final String customerIdentity;
	private final String experiment;
	private final String scenario;

	public CustomerScenarioDTO(CustomerScenario customerScenario) {
		customerIdentity = customerScenario.getCustomer().getIdentity();
		experiment = customerScenario.getScenario().getExperiment().getKey();
		scenario = customerScenario.getScenario().getKey();
	}
}
