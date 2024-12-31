import React from 'react';
import { X } from 'lucide-react';
import { MonthlyData, CalculationResults } from '../types';
import { CalculationDetails } from './CalculationDetails';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  monthlyData: MonthlyData[];
  results: CalculationResults;
}

export function CalculationsModal({ isOpen, onClose, monthlyData, results }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Calculation Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">No-Show Rate</h3>
            <CalculationDetails data={monthlyData} metric="noShow" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Average Charge per Visit</h3>
            <CalculationDetails data={monthlyData} metric="averageCharge" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Revenue Improvements</h3>
            {[2, 5, 7, 10].map(percent => (
              <div key={percent} className="space-y-2">
                <h4 className="font-medium">{percent}% Improvement</h4>
                <CalculationDetails
                  data={monthlyData}
                  metric="improvement"
                  improvementPercent={percent}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}