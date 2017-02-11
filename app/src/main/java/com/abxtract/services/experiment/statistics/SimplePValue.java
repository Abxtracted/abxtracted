package com.abxtract.services.experiment.statistics;

/**
 * Based on this table: https://www.medcalc.org/manual/chi-square-table.php
 **/
public class SimplePValue {
	public Double fromChiSquare(Double chiSquare) {
		if (chiSquare < 0.000982)
			return 0.995;
		else if (chiSquare < 1.642)
			return 0.975;
		else if (chiSquare < 2.706)
			return 0.20;
		else if (chiSquare < 3.841)
			return 0.10;
		else if (chiSquare < 5.024)
			return 0.05;
		else if (chiSquare < 5.412)
			return 0.025;
		else if (chiSquare < 6.635)
			return 0.02;
		else if (chiSquare < 7.879)
			return 0.01;
		else if (chiSquare < 9.550)
			return 0.005;
		else if (chiSquare < 10.828)
			return 0.002;
		else
			return 0.001;
	}

}
