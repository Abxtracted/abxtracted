package com.abxtract.resource;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.dtos.UserDTO;
import com.abxtract.models.User;
import com.abxtract.services.UserService;

@RestController
public class UserResource {
	@Autowired
	private UserService service;

	@RequestMapping("/user")
	public UserDTO user(OAuth2Authentication auth) throws IOException {
		final User user = service.process( auth );
		return new UserDTO( user.getId(), user.getEmail(), user.getEmail(), user.getPicture() );
	}
}
