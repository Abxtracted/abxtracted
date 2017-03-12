package com.abxtract.exceptions;

public class ExperimentNotFoundException extends NotFoundException {
	public ExperimentNotFoundException(final String id) {
		super( "Experiment not found:" + id);
	}
}
