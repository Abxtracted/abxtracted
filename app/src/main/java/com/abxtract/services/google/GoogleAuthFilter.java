package com.abxtract.services.google;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.abxtract.models.User;
import com.abxtract.services.UserService;
import com.google.api.client.repackaged.com.google.common.base.Strings;

@Component
public class GoogleAuthFilter implements Filter {
	@Autowired
	private UserService users;

	private static final List<String> WHITELIST = Arrays.asList(
			"/auth/login",
			"/auth/callback",
			"/monitoring",
			"/public/",
			"*.js",
			"*.css",
			"*.html",
			"/images/*",
			"/fonts/*",
			"/"
	);

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(
			ServletRequest request,
			ServletResponse response,
			FilterChain chain
	) throws IOException, ServletException {
		final HttpServletRequest req = (HttpServletRequest) request;
		final HttpServletResponse resp = (HttpServletResponse) response;
		if (!isWhitelisted( req.getRequestURI() ) && !isOptionsRequest( req.getMethod() )) {
			final String token = getToken( req );
			if (Strings.isNullOrEmpty( token )) {
				resp.sendError( HttpServletResponse.SC_UNAUTHORIZED, "Missing authentication token or header." );
			} else {
				checkToken( req, resp, token );
			}
		}
		if (resp.isCommitted()) {
			return;
		}
		chain.doFilter( request, response );
	}

	private boolean isOptionsRequest(String method) {
		return method.equalsIgnoreCase( "options" );
	}

	private String getToken(HttpServletRequest req) {
		return Optional.ofNullable( req.getHeader( "X-Auth-Token" ) )
				.orElse( getTokenFromCookie( req ) );
	}

	private String getTokenFromCookie(HttpServletRequest req) {
		return Stream.of( Optional.ofNullable( req.getCookies() ).orElse( new Cookie[] {} ) )
				.filter( cookie -> {
					System.out.println( cookie.getName() + "=" + cookie.getValue() );
					return cookie.getName().equals( "auth-token" );
				} )
				.map( cookie -> cookie.getValue() )
				.findFirst()
				.orElse( "" );
	}

	@Override
	public void destroy() {

	}

	private void checkToken(HttpServletRequest req, HttpServletResponse resp, String token) throws IOException {
		final User user = users.byAuthToken( token );
		if (user == null) {
			resp.sendError( HttpServletResponse.SC_UNAUTHORIZED, "Invalid authentication token." );
		}
		req.setAttribute( "user", user );
	}

	private boolean isWhitelisted(final String uri) {
		return WHITELIST.stream()
				.filter( pattern -> uri.startsWith( pattern ) )
				.findAny()
				.isPresent();
	}

}
