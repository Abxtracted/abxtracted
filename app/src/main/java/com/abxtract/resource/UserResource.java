package com.abxtract.resource;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.abxtract.services.UserService;
import com.abxtract.services.google.GoogleCredentialService;
import com.abxtract.services.google.GoogleRedirectService;
import com.abxtract.services.google.GoogleUserDTO;
import com.abxtract.services.google.GoogleUserService;

@RestController
public class UserResource {
	@Autowired
	private UserService service;

	@Autowired
	private GoogleRedirectService redirect;

	@Autowired
	private GoogleCredentialService credentials;

	@Autowired
	private GoogleUserService googleService;

	@RequestMapping("/auth/login")
	public ModelAndView login() {
		return new ModelAndView( "redirect:" + redirect.buildRedirectUrl() );
	}

	@RequestMapping("/auth/callback")
	public void callback(@Param("code") String code) throws IOException {
		final GoogleUserDTO dto = googleService.retrieveUserData( credentials.retrieveCredential( code ) );
		service.save()
	}
	//
	//	@RequestMapping("/user")
	//	public UserDTO user(OAuth2Authentication auth) throws IOException {
	//		final User user = service.process( auth );
	//		return new UserDTO( user.getId(), user.getEmail(), user.getEmail(), user.getPicture() );
	//	}
}
