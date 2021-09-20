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
@Table(name="airline")
public class Airline extends BaseEntity {
  @Column(name="airline_name", length=20, unique = true)
  @NotNull
  private String airlineName;
  @Column(name="logo_path")
  private String logoPath;
}
