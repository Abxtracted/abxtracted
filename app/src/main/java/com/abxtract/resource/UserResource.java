package com.abxtract.resource;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.abxtract.models.AuthToken;
import com.abxtract.models.User;
import com.abxtract.repositories.AuthTokenRepository;
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
	private AuthTokenRepository authTokens;

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
	public void callback(@Param("code") String code, HttpServletResponse response) throws IOException {
		final GoogleUserDTO dto = googleService.retrieveUserData( credentials.retrieveCredential( code ) );
		final AuthToken token = authTokens.save( AuthToken.builder().user( service.save( dto ) ).build() );
		response.addCookie( new Cookie( "auth-token", token.getId() ) );
		response.sendRedirect( "http://localhost:8080/moises" );
	}
	//
	//	@RequestMapping("/user")
	//	public UserDTO user(OAuth2Authentication auth) throws IOException {
	//		final User user = service.process( auth );
	//		return new UserDTO( user.getId(), user.getEmail(), user.getEmail(), user.getPicture() );
	//	}
}
