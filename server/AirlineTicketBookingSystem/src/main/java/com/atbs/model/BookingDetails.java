package com.atbs.model;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "booking_details")
public class BookingDetails extends BaseEntity {

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "flight_id")
	private Flight flight;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;

	private LocalDateTime bookingTime;
	@NotNull
	private int numberOfSeats;

	@Enumerated(EnumType.STRING)
	@Column(length = 10, nullable = false)
	private Status bookingStatus;

	@OneToMany
	private List<Passenger> passenger;
	
//	@OneToOne(mappedBy = "booking")
//	private PaymentDetails paymentDetails;
}
