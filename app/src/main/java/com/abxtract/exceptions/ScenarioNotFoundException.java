package com.abxtract.exceptions;

public class ScenarioNotFoundException extends NotFoundException {
	public ScenarioNotFoundException(final String id) {
		super( "Scenario not found:" + id);
	}
}
