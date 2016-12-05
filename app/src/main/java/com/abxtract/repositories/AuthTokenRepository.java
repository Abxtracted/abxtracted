package com.abxtract.repositories;

import org.springframework.data.repository.CrudRepository;

import com.abxtract.models.AuthToken;

public interface AuthTokenRepository extends CrudRepository<AuthToken, String> {

}
