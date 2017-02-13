package com.abxtract.services.experiment.statistics;

public class SimpleChiSquare {

	public Double calculate(Long aTotal, Long aConverted, Long bTotal, Long bConverted) {
		Long aUnconverted = aTotal - aConverted;
		Long bUnconverted = bTotal - bConverted;
		Long unconverted = aUnconverted + bUnconverted;
		Long converted = aConverted + bConverted;
		Long total = aTotal + bTotal;

		Double expectedAConverted = calculateExpected( total, converted, aConverted );
		Double expectedBConverted = calculateExpected( total, converted, bConverted );
		Double expectedAUnconverted = calculateExpected( total, unconverted, aUnconverted );
		Double expectedBUnconverted = calculateExpected( total, unconverted, bUnconverted );

		Double chiAConverted = calculateChiSquare( aConverted, expectedAConverted );
		Double chiAUnconverted = calculateChiSquare( aUnconverted, expectedAUnconverted );
		Double chiBConverted = calculateChiSquare( bConverted, expectedBConverted );
		Double chiBUnconverted = calculateChiSquare( bUnconverted, expectedBUnconverted );

		return chiAConverted + chiAUnconverted + chiBConverted + chiBUnconverted;
	}

	private Double calculateExpected(Long total, Long totalGroup, Long totalAnswer) {
		return (totalGroup.doubleValue() * totalAnswer.doubleValue()) / total.doubleValue();
	}

	private Double calculateChiSquare(Long observed, Double expected) {
		return Math.sqrt( (observed - expected) / expected );
	}
}
