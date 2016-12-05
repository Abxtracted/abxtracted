package com.abxtract.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.User;

public interface UserRepository extends CrudRepository<User, String> {
	@Query("select u from User u where u.googleId = ?1")
	User findByGoogleId(String id);

	@Query("select u from User u, AuthToken a where a.id = ?1 and u.id = a.user.id")
	User findByAuthToken(String id);
}
