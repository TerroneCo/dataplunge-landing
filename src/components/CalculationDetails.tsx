import React from 'react';
import { MonthlyData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface Props {
  data: MonthlyData[];
  metric: 'noShow' | 'averageCharge' | 'improvement';
  improvementPercent?: number;
}

export function CalculationDetails({ data, metric, improvementPercent }: Props) {
  const totalAppointments = data.reduce((sum, month) => sum + month.appointments, 0);
  const totalCheckedIn = data.reduce((sum, month) => sum + month.checkedIn, 0);
  const totalCharges = data.reduce((sum, month) => sum + month.totalCharges, 0);
  const noShowPercentage = ((totalAppointments - totalCheckedIn) / totalAppointments) * 100;
  const averageChargePerVisit = totalCharges / totalCheckedIn;

  const renderNoShowCalculation = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p>No-Show Rate = (Total Appointments - Total Check-ins) / Total Appointments × 100</p>
        <p className="font-mono text-sm">
          = ({totalAppointments} - {totalCheckedIn}) / {totalAppointments} × 100
          = {noShowPercentage.toFixed(1)}%
        </p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-900 font-medium mb-2">In Simple Terms:</p>
        <p className="text-sm text-blue-800">
          Out of {totalAppointments} total scheduled appointments, {totalCheckedIn} patients showed up. 
          This means {totalAppointments - totalCheckedIn} patients didn't show up. 
          When we convert this to a percentage, {noShowPercentage.toFixed(1)}% of appointments were missed.
        </p>
      </div>
    </div>
  );

  const renderAverageChargeCalculation = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <p>Average Charge = Total Charges / Total Check-ins</p>
        <p className="font-mono text-sm">
          = {formatCurrency(totalCharges)} / {totalCheckedIn}
          = {formatCurrency(averageChargePerVisit)}
        </p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-sm text-blue-900 font-medium mb-2">In Simple Terms:</p>
        <p className="text-sm text-blue-800">
          When we take the total revenue of {formatCurrency(totalCharges)} and divide it by the {totalCheckedIn} patients 
          who showed up, we find that each patient visit is worth about {formatCurrency(averageChargePerVisit)} on average.
        </p>
      </div>
    </div>
  );

  const renderImprovementCalculation = () => {
    if (!improvementPercent) return null;
    
    const improvedNoShowRate = noShowPercentage - improvementPercent;
    const improvedCheckins = totalAppointments * ((100 - improvedNoShowRate) / 100);
    const additionalCheckins = improvedCheckins - totalCheckedIn;
    const additionalRevenue = additionalCheckins * averageChargePerVisit;

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p>Additional Revenue with {improvementPercent}% Improvement:</p>
          <div className="font-mono text-sm space-y-1">
            <p>1. Improved No-Show Rate = Current Rate - Improvement</p>
            <p className="ml-4">= {noShowPercentage.toFixed(1)}% - {improvementPercent}% = {improvedNoShowRate.toFixed(1)}%</p>
            
            <p>2. Improved Check-ins = Total Appointments × (100% - Improved No-Show Rate)</p>
            <p className="ml-4">= {totalAppointments} × (100% - {improvedNoShowRate.toFixed(1)}%) = {improvedCheckins.toFixed(1)}</p>
            
            <p>3. Additional Check-ins = Improved Check-ins - Current Check-ins</p>
            <p className="ml-4">= {improvedCheckins.toFixed(1)} - {totalCheckedIn} = {additionalCheckins.toFixed(1)}</p>
            
            <p>4. Additional Revenue = Additional Check-ins × Average Charge</p>
            <p className="ml-4">= {additionalCheckins.toFixed(1)} × {formatCurrency(averageChargePerVisit)} = {formatCurrency(additionalRevenue)}</p>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-900 font-medium mb-2">In Simple Terms:</p>
          <p className="text-sm text-blue-800">
            If we reduce no-shows by {improvementPercent}%, your no-show rate would drop from {noShowPercentage.toFixed(1)}% 
            to {improvedNoShowRate.toFixed(1)}%. This means about {Math.round(additionalCheckins)} more patients would show up 
            for their appointments. Since each patient visit is worth {formatCurrency(averageChargePerVisit)} on average, 
            these additional visits would bring in {formatCurrency(additionalRevenue)} more revenue.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
      {metric === 'noShow' && renderNoShowCalculation()}
      {metric === 'averageCharge' && renderAverageChargeCalculation()}
      {metric === 'improvement' && renderImprovementCalculation()}
    </div>
  );
}