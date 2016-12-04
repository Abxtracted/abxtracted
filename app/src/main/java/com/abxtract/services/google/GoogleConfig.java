package com.abxtract.services.google;

import lombok.Getter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class GoogleConfig {
	@Value("${google.oauth2.id}")
	private String id;
	@Value("${google.oauth2.secret}")
	private String secret;
	@Value("${google.oauth2.callback}")
	private String callback;
}
