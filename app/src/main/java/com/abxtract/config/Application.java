package com.abxtract.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.abxtract")
@EnableJpaRepositories(basePackages = "com.abxtract.repositories")
@EntityScan(basePackages = "com.abxtract.models")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run( Application.class, args );
	}
}
