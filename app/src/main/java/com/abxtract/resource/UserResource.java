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

@RestController
public class UserResource {
	@Autowired
	private UserRepository users;
	@Autowired
	private TenantRepository tenants;

	@RequestMapping("/user")
	public User user(Principal principal, OAuth2Authentication auth) throws IOException {
		final Map<String, Object> dto = (Map<String, Object>) auth.getUserAuthentication().getDetails();
		System.out.println( dto );
		final User user = users.findByGoogleId( dto.get( "sub" ).toString() );
		if (user != null) {
			return user;
		}
		return users.save(
				User.builder()
						.email( dto.get( "email" ).toString() )
						.emailVerified( (Boolean) dto.get( "email_verified" ) )
						.name( dto.get( "name" ).toString() )
						.picture( dto.get( "picture" ).toString() )
						.googleId( dto.get( "sub" ).toString() )
						.token( ((OAuth2AuthenticationDetails) auth.getDetails()).getTokenValue() )
						.tenant( tenants.save( new Tenant() ) )
						.build()
		);
	}
}
