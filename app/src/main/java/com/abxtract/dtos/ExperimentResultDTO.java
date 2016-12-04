package com.abxtract.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExperimentResultDTO {
	private final String name;
	private final Long sampleSize;
	private final Double minSampleSize;
	private final Double marginOfError;
	private final List<VersionResult> versions;

	@Getter
	@AllArgsConstructor
	public static class VersionResult {
		private final String id;
		private final String name;
		private final Long sampleSize;
		private final Long converted;
	}
}
