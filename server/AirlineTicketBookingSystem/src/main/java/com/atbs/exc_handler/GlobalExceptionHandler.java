package com.atbs.exc_handler;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.RestClientException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.atbs.custom_exception.UserHandlingException;
import com.atbs.dto.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(UserHandlingException.class)
  public ResponseEntity<?> handleUserHandlingException(UserHandlingException exc, WebRequest request) {
	System.out.println("handling  res not found exc ");
	ErrorResponse errResp = new ErrorResponse(exc.getMessage(), request.getDescription(false));
	return new ResponseEntity<>(errResp, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e) {
	System.out.println("handling constraint violation exc");
	ErrorResponse errResp = new ErrorResponse(e.getMessage(), "Constraint voilation exception");
	return new ResponseEntity<ErrorResponse>(errResp, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
	private ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e, WebRequest request) {
	  System.out.println("handling data integrity exception");
	  ErrorResponse errResp = new ErrorResponse("Sql exception", request.getDescription(false));
	  return new ResponseEntity<ErrorResponse>(errResp, HttpStatus.INTERNAL_SERVER_ERROR);
	}

  // This Exception is thrown when a method argument fails validation typically
  // due to @Valid style validation
  // or request body content is required.
  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
	  HttpStatus status, WebRequest request) {
	System.out.println("handling method arg not valid");

	List<String> validationErrs = new ArrayList<>();
	for (FieldError err : ex.getBindingResult().getFieldErrors())
	  validationErrs.add(err.getDefaultMessage());

	ErrorResponse errResp = new ErrorResponse("Validation Failed", validationErrs.toString());
	return new ResponseEntity<Object>(errResp, status);// HTTP 400

  }

  // handle REST call related exc
  @ExceptionHandler(RestClientException.class)
  public ResponseEntity<?> handleRestClntException(RestClientException exc, WebRequest request) {
	System.out.println("in handle rest clnt exception " + exc);
	System.out.println(exc.getMostSpecificCause());
	ErrorResponse errResp = new ErrorResponse("Rest API Call Failed ", request.getDescription(false));
	return new ResponseEntity<>(errResp, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // handle ANY other exception
  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleAnyException(Exception exc, WebRequest request) {
	System.out.println("in handle exception " + exc);

	ErrorResponse errResp = new ErrorResponse(exc.getMessage(), request.getDescription(false));
	return new ResponseEntity<>(errResp, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
