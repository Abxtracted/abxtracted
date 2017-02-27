package com.abxtract.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ExperimentViewDTO {
	private final String name;
	private final Long sampleSize;
	private final Double minSampleSize;
	private final Double marginOfError;
	private final List<ScenarioResult> scenarios;
	private final Double chiSquare;
	private final Double pValue;
	private final ScenarioDTO result;

	@Getter
	@AllArgsConstructor
	public static class ScenarioResult {
		private final String id;
		private final String name;
		private final Long sampleSize;
		private final Long converted;
	}
}
