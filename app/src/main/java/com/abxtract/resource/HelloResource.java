package com.abxtract.resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloResource {
	@RequestMapping("/hello")
	public String hello() {
		return "Hi";
	}
}
