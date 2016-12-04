package com.abxtract.services.google;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.oauth2.Oauth2;
import com.google.api.services.oauth2.model.Userinfoplus;

@Service
public class GoogleUserService {
	public GoogleUserDTO retrieveUserData(GoogleCredential credential) throws IOException {
		JacksonFactory jsonFactory = new JacksonFactory();
		HttpTransport httpTransport = new NetHttpTransport();

		Oauth2 oauth2 = new Oauth2.Builder( httpTransport, jsonFactory, credential )
				.setApplicationName( "Abxtract" )
				.build();

		Userinfoplus userInfo = oauth2.userinfo().get().execute();

		return GoogleUserDTO.builder()
				.sub( userInfo.getId() )
				.name( userInfo.getName() )
				.email( userInfo.getEmail() )
				.imageUrl( userInfo.getPicture() )
				.accessToken( credential.getAccessToken() )
				.refreshToken( credential.getRefreshToken() )
				.build();
	}
}
