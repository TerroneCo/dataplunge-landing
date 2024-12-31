import React from 'react';
import { CalculationResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface Props {
  results: CalculationResults;
}

export function MetricsDisplay({ results }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="text-sm text-gray-600">No-Show Rate</span>
          <p className="text-3xl font-bold text-blue-600">
            {results.noShowPercentage.toFixed(1)}%
          </p>
        </div>

        <div>
          <span className="text-sm text-gray-600">Average Charge per Visit</span>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(results.averageChargePerVisit)}
          </p>
        </div>
      </div>
    </div>
  );
}