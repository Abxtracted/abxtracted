package com.abxtract.services.google;

import org.springframework.stereotype.Service;

@Service
public class GoogleRedirectService {

	public String buildRedirectUrl() {
		return new StringBuilder()
				.append( "https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile%20openid&redirect_uri=" )
				.append( "http://localhost:8080/auth/callback" ).append( "&response_type=code&client_id=" )
				.append( "130476430955-mpuj4grf05tl2gq2f73g4p8liqc45blp.apps.googleusercontent.com" ).append( "&access_type=offline" )
				.toString();
	}
}
