import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculationResults, MonthlyData } from '../types';
import { MetricsDisplay } from './MetricsDisplay';
import { ImprovementsDisplay } from './ImprovementsDisplay';
import { CalculationsModal } from './CalculationsModal';

interface Props {
  results: CalculationResults;
  monthlyData: MonthlyData[];
}

export function ResultsDisplay({ results, monthlyData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <MetricsDisplay results={results} />
      <ImprovementsDisplay results={results} />
      
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <Calculator className="w-5 h-5" />
          Check the Math
        </button>
      </div>

      <CalculationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthlyData={monthlyData}
        results={results}
      />
    </div>
  );
}