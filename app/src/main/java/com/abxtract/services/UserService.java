package com.abxtract.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abxtract.models.Tenant;
import com.abxtract.models.User;
import com.abxtract.repositories.TenantRepository;
import com.abxtract.repositories.UserRepository;
import com.abxtract.services.google.GoogleUserDTO;

@Service
public class UserService {
	@Autowired
	private UserRepository users;
	@Autowired
	private TenantRepository tenants;

	public User byAuthToken(String auth) {
		return users.findByAuthToken( auth );
	}

	public User save(final GoogleUserDTO data) {
		User user = users.findByGoogleId( data.getId() );
		if (user == null) {
			user = new User();
			user.setGoogleId( data.getId() );
			user.setTenant( tenants.save( new Tenant() ) );
			user.setRefreshToken( data.getRefreshToken() );
		}
		user.setEmail( data.getEmail() );
		user.setName( data.getName() );
		user.setPicture( data.getImageUrl() );
		user.setToken( data.getAccessToken() );
		return users.save( user );
	}
}
