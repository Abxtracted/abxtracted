package com.abxtract.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class AppConfig {
    @Value( "${spring.application.domain}" )
    private String domain;
}
