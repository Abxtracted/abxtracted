package com.abxtract.services.experiment.statistics;

import static java.lang.Math.ceil;
import static java.lang.Math.pow;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SampleSizeCalculation {
	private final Double confidence;
	private final Double expectedProportion;
	private final Double marginOfError;

	public Double calculate() {
		return ceil( pow( confidence, 2 ) * expectedProportion * (1 - expectedProportion) ) / pow( marginOfError, 2 );
	}
}
