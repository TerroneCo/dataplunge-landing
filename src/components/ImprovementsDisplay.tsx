import React from 'react';
import { CalculationResults } from '../types';
import { formatCurrency } from '../utils/calculations';

interface Props {
  results: CalculationResults;
}

export function ImprovementsDisplay({ results }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Potential Monthly Revenue Improvements
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { percent: 2, value: results.improvements.twoPercent },
          { percent: 5, value: results.improvements.fivePercent },
          { percent: 7, value: results.improvements.sevenPercent },
          { percent: 10, value: results.improvements.tenPercent },
        ].map(({ percent, value }) => (
          <div key={percent} className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-sm text-gray-600">{percent}% Improvement</span>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}