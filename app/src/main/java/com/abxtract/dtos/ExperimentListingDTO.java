package com.abxtract.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import com.abxtract.repositories.projections.ExperimentListingProjection;

@Getter
@Builder
@AllArgsConstructor
public class ExperimentListingDTO {
	private final String id;
	private final String name;
	private final String key;
	private final ScenarioDTO result;

	public ExperimentListingDTO(ExperimentListingProjection experimentListingProjection) {
		id = experimentListingProjection.getId();
		name = experimentListingProjection.getName();
		key = experimentListingProjection.getKey();

		if (experimentListingProjection.getResult() != null)
			result = new ScenarioDTO( experimentListingProjection.getResult() );
		else
			result = null;
	}
}
