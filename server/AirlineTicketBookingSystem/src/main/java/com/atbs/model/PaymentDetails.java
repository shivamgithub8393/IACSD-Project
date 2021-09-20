package com.atbs.model;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="payment_details")
public class PaymentDetails extends BaseEntity {
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="booking_id")
	private BookingDetails booking;
	
	private LocalDateTime paymentTime;
	
	@Enumerated(EnumType.STRING)
	@Column(length=10)
	@NotNull
	private Status paymentStatus;
	
	private double paymentAmount;
	
}
