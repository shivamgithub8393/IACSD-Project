package com.atbs.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity 
@Table(name="airport")
public class Airport extends BaseEntity {
  @Column(length=30, unique=true)
  @NotNull
  private String airportNumber;
  @NotNull
  @Column(length=30, unique=true)
  private String airportName;
  @Column(length=30)
  private String city;
  @Column(length=30)
  private String state;
  @Column(length=30)
  private String country;
}
