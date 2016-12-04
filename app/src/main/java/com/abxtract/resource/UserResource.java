package com.abxtract.resource;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.models.Tenant;
import com.abxtract.models.User;
import com.abxtract.repositories.TenantRepository;
import com.abxtract.repositories.UserRepository;
import com.abxtract.services.UserService;

@RestController
public class UserResource {
	@Autowired
	private UserService service;

	@RequestMapping("/user")
	public User user(OAuth2Authentication auth) throws IOException {
		return service.process( auth );
	}
}
