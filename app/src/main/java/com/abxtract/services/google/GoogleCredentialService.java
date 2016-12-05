package com.abxtract.services.google;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

@Service
public class GoogleCredentialService {
	@Autowired
	private GoogleConfig config;

	public GoogleCredential retrieveCredential(String code) throws IOException {
		GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
				new NetHttpTransport(),
				new JacksonFactory(),
				config.getId(),
				config.getSecret(),
				code,
				config.getCallback()
		).execute();

		return new GoogleCredential.Builder()
				.setJsonFactory( new JacksonFactory() )
				.setTransport( new NetHttpTransport() )
				.setClientSecrets( config.getId(), config.getSecret() )
				.build()
				.setFromTokenResponse( tokenResponse );
	}
}
