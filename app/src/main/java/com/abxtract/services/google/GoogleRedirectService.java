package com.abxtract.services.google;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoogleRedirectService {
	@Autowired
	private GoogleConfig config;

	public String buildRedirectUrl() {
		return new StringBuilder()
				.append( "https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&redirect_uri=" )
				.append( config.getCallback() ).append( "&response_type=code&client_id=" )
				.append( config.getId() ).append( "&access_type=offline" )
				.toString();
	}
}
