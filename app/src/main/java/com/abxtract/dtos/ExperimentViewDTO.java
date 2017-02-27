package com.abxtract.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import com.abxtract.models.Project;

@Getter
@Builder
@AllArgsConstructor
public class ExperimentViewDTO {
	private final Project project;
	private final String name;
	private final Long sampleSize;
	private final Double marginOfError;
	private final List<ScenarioResult> scenarios;
	private final Double chiSquare;
	private final Double pValue;
	private final ScenarioDTO result;
	private final String status;

	@Getter
	@AllArgsConstructor
	public static class ScenarioResult {
		private final String id;
		private final String name;
		private final Long sampleSize;
		private final Long converted;
		private final Double rate;
	}
}
