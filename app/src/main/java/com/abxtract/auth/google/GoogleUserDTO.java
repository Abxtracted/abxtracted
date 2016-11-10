package com.abxtract.auth.google;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class GoogleUserDTO {
    private final String email;
    private final String name;
    private final String accessToken;
    private final String refreshToken;
}
