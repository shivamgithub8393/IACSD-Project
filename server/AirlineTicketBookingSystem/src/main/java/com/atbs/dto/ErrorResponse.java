package com.atbs.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ErrorResponse {
	private String message;
	private String errorDetails;
	private LocalDateTime timeStamp;
	public ErrorResponse(String message, String errorDetails) {
		super();
		this.message = message;
		this.errorDetails = errorDetails;
		timeStamp=LocalDateTime.now();
	}
	
}
