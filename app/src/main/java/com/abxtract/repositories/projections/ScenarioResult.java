package com.abxtract.repositories.projections;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ScenarioResult {
	private final String id;
	private final String name;
	private final Long count;
}
