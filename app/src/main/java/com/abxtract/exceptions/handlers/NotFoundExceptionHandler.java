package com.abxtract.exceptions.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.exceptions.NotFoundException;

@ControllerAdvice
@RestController
public class NotFoundExceptionHandler {
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NotFoundException.class)
	public String onError(NotFoundException exception) {
		return exception.getMessage();
	}
}
