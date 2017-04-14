package com.abxtract.services.experiment.statistics;

import static java.lang.Math.pow;
import static java.lang.Math.sqrt;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class MarginOfErrorCalculation {
	private final Double confidence;
	private final Double expectedProportion;
	private final Double sample;

	public Double calculate() {
		return sqrt( (pow( confidence, 2 ) * expectedProportion * (1 - expectedProportion)) / sample );
	}
}