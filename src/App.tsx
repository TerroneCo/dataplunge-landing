import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { MonthlyData, CalculationResults } from './types';
import { calculateResults } from './utils/calculations';
import { MonthlyDataInput } from './components/MonthlyDataInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ShareButton } from './components/ShareButton';

function App() {
  const [monthCount, setMonthCount] = useState<number>(1);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([
    { month: 'January', appointments: 0, checkedIn: 0, totalCharges: 0 }
  ]);
  const [results, setResults] = useState<CalculationResults | null>(null);

  useEffect(() => {
    const newData = [...monthlyData];
    if (monthCount > newData.length) {
      // Add more months
      for (let i = newData.length; i < monthCount; i++) {
        newData.push({
          month: 'January',
          appointments: 0,
          checkedIn: 0,
          totalCharges: 0
        });
      }
    } else if (monthCount < newData.length) {
      // Remove excess months
      newData.splice(monthCount);
    }
    setMonthlyData(newData);
  }, [monthCount]);

  useEffect(() => {
    const hasData = monthlyData.some(data => 
      data.appointments > 0 && data.checkedIn > 0 && data.totalCharges > 0
    );
    
    if (hasData) {
      setResults(calculateResults(monthlyData));
    }
  }, [monthlyData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">No-Show Revenue Impact Calculator</h1>
          </div>
          {results && (
            <ShareButton monthlyData={monthlyData} results={results} />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of months to analyze: {monthCount}
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={monthCount}
              onChange={(e) => setMonthCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-4 mb-8">
            {monthlyData.map((data, index) => (
              <MonthlyDataInput
                key={index}
                data={data}
                onChange={(newData) => {
                  const updatedData = [...monthlyData];
                  updatedData[index] = newData;
                  setMonthlyData(updatedData);
                }}
              />
            ))}
          </div>

          {results && <ResultsDisplay results={results} monthlyData={monthlyData} />}
        </div>
      </div>
    </div>
  );
}

export default App;