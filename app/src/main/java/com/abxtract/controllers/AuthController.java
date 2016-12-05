package com.abxtract.controllers;

import java.io.IOException;
import java.util.stream.Stream;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abxtract.dtos.UserDTO;
import com.abxtract.models.AuthToken;
import com.abxtract.models.User;
import com.abxtract.repositories.AuthTokenRepository;
import com.abxtract.services.UserService;
import com.abxtract.services.google.GoogleCredentialService;
import com.abxtract.services.google.GoogleRedirectService;
import com.abxtract.services.google.GoogleUserDTO;
import com.abxtract.services.google.GoogleUserService;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
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

	@RequestMapping("/login")
	public void login(@RequestParam("redirect_to") String redirectTo, HttpServletResponse response) throws IOException {
		response.addCookie( new Cookie( "redirect-to", redirectTo ) );
		response.sendRedirect( redirect.url() );
	}

	@RequestMapping("/callback")
	public void callback(@Param("code") String code, HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		final GoogleUserDTO dto = googleService.retrieveUserData( credentials.retrieveCredential( code ) );
		final AuthToken token = authTokens.save( AuthToken.builder().user( service.save( dto ) ).build() );
		final String uri = getRedirectTo( request );
		response.setHeader( "X-Auth-Token", token.getId() );
		response.addCookie( cookieFor( token ) );
		response.sendRedirect( uri );
	}

	@RequestMapping("/current")
	public UserDTO user(@RequestAttribute("user") User user) throws IOException {
		return new UserDTO( user.getId(), user.getEmail(), user.getEmail(), user.getPicture() );
	}

	private Cookie cookieFor(AuthToken token) {
		final Cookie cookie = new Cookie( "auth-token", token.getId() );
		cookie.setPath( "/" );
		return cookie;
	}

	private String getRedirectTo(HttpServletRequest request) {
		return Stream.of( request.getCookies() )
				.filter( cookie -> cookie.getName().equals( "redirect-to" ) )
				.findFirst()
				.get()
				.getValue();
	}
}
