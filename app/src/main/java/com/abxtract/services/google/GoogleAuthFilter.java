package com.abxtract.services.google;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

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

	private static final List<String> PRIVATE_APIS = Arrays.asList(
			"/projects"
	);

	@Autowired
	private UserService users;

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
		if (isBlacklisted( req.getRequestURI() ) && !isOptions( req ))
			authorize( req, resp );
		if (!resp.isCommitted())
			chain.doFilter( request, response );
	}

	private void authorize(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		final String token = getToken( req );
		if (Strings.isNullOrEmpty( token ))
			resp.sendError( SC_UNAUTHORIZED, "Missing authentication token or header." );
		else
			checkToken( req, resp, token );
	}

	private boolean isOptions(HttpServletRequest req) {
		return req.getMethod().equals( "OPTIONS" );
	}

	private String getToken(HttpServletRequest req) {
		return Optional
				.ofNullable( req.getHeader( "X-Auth-Token" ) )
				.orElse( getTokenFromCookie( req ) );
	}

	private String getTokenFromCookie(HttpServletRequest req) {
		final Cookie[] cookies = Optional
				.ofNullable( req.getCookies() )
				.orElse( new Cookie[] {} );
		return Stream.of( cookies )
				.filter( cookie -> cookie.getName().equals( "auth-token" ) )
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
			resp.sendError( SC_UNAUTHORIZED, "Invalid authentication token." );
			return;
		}
		// TODO remover user da req
		req.setAttribute( "user", user );
		req.setAttribute( "user_id", user.getId() );
		req.setAttribute( "tenant_id", user.getTenant().getId() );
	}

	private boolean isBlacklisted(final String uri) {
		return PRIVATE_APIS.stream()
				.filter( pattern -> uri.startsWith( pattern ) )
				.findAny()
				.isPresent();
	}
}
