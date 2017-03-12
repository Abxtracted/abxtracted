package com.abxtract.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import com.abxtract.models.Scenario;

@AllArgsConstructor
@Builder
@Getter
public class ScenarioDTO {
	private final String id;
	private final String key;
	private final String name;

	public ScenarioDTO(Scenario scenario) {
		id = scenario.getId();
		key = scenario.getKey();
		name = scenario.getName();
	}
}
