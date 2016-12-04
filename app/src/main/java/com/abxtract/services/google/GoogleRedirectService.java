package com.abxtract.services.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoogleRedirectService {
	@Autowired
	private GoogleConfig config;

	public String url() {
		return String.format(
				"https://accounts.google.com/o/oauth2/v2/auth?scope=%s&redirect_uri=%s&response_type=code&client_id=%s&access_type=offline",
				config.getScopes().replaceAll( " ", "%20" ),
				config.getCallback(),
				config.getId()
		);
	}
}
