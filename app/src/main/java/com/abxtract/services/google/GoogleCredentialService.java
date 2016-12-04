package com.abxtract.services.google;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

@Service
public class GoogleCredentialService {
	public GoogleCredential retrieveCredential(String code) throws IOException {
		GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
				new NetHttpTransport(),
				new JacksonFactory(),
				"130476430955-mpuj4grf05tl2gq2f73g4p8liqc45blp.apps.googleusercontent.com",
				"ng1zI-i9LkXx7i6T9zh3tV-P",
				code,
				"http://localhost:8080/auth/callback"
		).execute();

		return new GoogleCredential.Builder()
				.setJsonFactory( new JacksonFactory() )
				.setTransport( new NetHttpTransport() )
				.setClientSecrets(
						"130476430955-mpuj4grf05tl2gq2f73g4p8liqc45blp.apps.googleusercontent.com",
						"ng1zI-i9LkXx7i6T9zh3tV-P"
				).build()
				.setFromTokenResponse( tokenResponse );
	}
}
