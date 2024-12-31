import React from 'react';
import { Share } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { PDFReport } from './PDFReport';
import { MonthlyData, CalculationResults } from '../types';

interface Props {
  monthlyData: MonthlyData[];
  results: CalculationResults;
}

export function ShareButton({ monthlyData, results }: Props) {
  const handleShare = async () => {
    try {
      const blob = await pdf(<PDFReport monthlyData={monthlyData} results={results} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'no-show-analysis.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Share className="w-4 h-4" />
      Download Report
    </button>
  );
}