package com.abxtract.exceptions;

public class ProjectNotFoundException extends NotFoundException {
	public ProjectNotFoundException(final String id) {
		super( "Project not found:" + id );
	}
}
