package com.abxtract.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
// the `/` is required by kubernetes ingress status checks
@RequestMapping({"", "/", "/status"})
public class StatusController {
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<String> getStatus() {
		return ResponseEntity.ok( "OK" );
	}
}
