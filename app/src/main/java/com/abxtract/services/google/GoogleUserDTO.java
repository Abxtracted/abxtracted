package com.abxtract.services.google;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class GoogleUserDTO {
	private final String id;
	private final String email;
	private final String name;
	private final String imageUrl;
	private final String accessToken;
	private final String refreshToken;
}
