package com.abxtract.resource;

import java.io.IOException;
import java.util.stream.Stream;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.dtos.UserDTO;
import com.abxtract.models.AuthToken;
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
	public void login(@RequestParam("redirect_to") String redirectTo, HttpServletResponse response) throws IOException {
		response.addCookie( new Cookie( "redirect-to", redirectTo ) );
		response.sendRedirect( redirect.url() );
	}

	@RequestMapping("/auth/callback")
	public void callback(
			@Param("code") String code,
			HttpServletRequest request,
			HttpServletResponse response
	) throws IOException {
		final GoogleUserDTO dto = googleService.retrieveUserData( credentials.retrieveCredential( code ) );
		final AuthToken token = authTokens.save( AuthToken.builder().user( service.save( dto ) ).build() );
		final String uri = Stream.of( request.getCookies() )
				.filter( cookie -> cookie.getName().equals( "redirect-to" ) )
				.findFirst()
				.get()
				.getValue();
		final Cookie cookie = new Cookie( "auth-token", token.getId() );
		cookie.setMaxAge( -1 );
		cookie.setHttpOnly( false );
		cookie.setSecure( true );
		response.addCookie( cookie );
		response.sendRedirect( uri );
	}

	@RequestMapping("/user")
	public UserDTO user(HttpServletRequest request) throws IOException {
		//			final User user = service.process( auth );
		return new UserDTO();
	}
}
