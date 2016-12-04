package com.abxtract.exceptions.handlers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.exceptions.ValidationException;

@ControllerAdvice
@RestController
public class ConstraintExceptionHandler {
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ValidationException.class)
	public Map<String, String> onError(ValidationException exception) {
		return exception.getErrors();
	}
}
