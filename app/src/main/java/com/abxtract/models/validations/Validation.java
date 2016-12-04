package com.abxtract.models.validations;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;

public class Validation<T> {
	private final T entity;

	public Validation(T entity) {
		this.entity = entity;
	}

	public Map<String, String> getErrors() {
		Validator validator = javax.validation.Validation.buildDefaultValidatorFactory().getValidator();
		Set<ConstraintViolation<T>> violations = validator.validate( entity );
		Map<String, String> errors = new HashMap<>();
		violations.forEach( violation -> addToErrors( errors, violation ) );
		return errors;
	}

	private void addToErrors(Map<String, String> errors, ConstraintViolation<T> violation) {
		errors.put( violation.getPropertyPath().toString(), violation.getMessage() );
	}

	public boolean isValid() {
		return getErrors().isEmpty();
	}
}