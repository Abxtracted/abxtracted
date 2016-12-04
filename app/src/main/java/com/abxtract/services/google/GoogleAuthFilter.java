package com.abxtract.services.google;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
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
			"/monitoring"
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
		final String token = req.getHeader( "X-Auth-Token" );
		if (Strings.isNullOrEmpty( token ) && !isWhitelisted( req.getRequestURI() )) {
			resp.sendError( HttpServletResponse.SC_UNAUTHORIZED );
		} else {
			checkToken( req, resp, token );
		}
		chain.doFilter( request, response );
	}

	@Override
	public void destroy() {

	}

	private void checkToken(HttpServletRequest req, HttpServletResponse resp, String token) throws IOException {
		final User user = users.byAuthToken( token );
		if (user == null) {
			resp.sendError( HttpServletResponse.SC_UNAUTHORIZED );
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
