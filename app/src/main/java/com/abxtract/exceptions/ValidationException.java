package com.abxtract.exceptions;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class ValidationException extends RuntimeException {
	@Getter
	private final Map<String, String> errors;
}