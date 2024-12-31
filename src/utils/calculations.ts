import { MonthlyData, CalculationResults } from '../types';

export const calculateResults = (data: MonthlyData[]): CalculationResults => {
  const totalAppointments = data.reduce((sum, month) => sum + month.appointments, 0);
  const totalCheckedIn = data.reduce((sum, month) => sum + month.checkedIn, 0);
  const totalCharges = data.reduce((sum, month) => sum + month.totalCharges, 0);

  const noShowPercentage = ((totalAppointments - totalCheckedIn) / totalAppointments) * 100;
  const averageChargePerVisit = totalCharges / totalCheckedIn;

  const calculateImprovement = (improvementPercent: number) => {
    const improvedCheckins = totalAppointments * ((100 - (noShowPercentage - improvementPercent)) / 100);
    const additionalCheckins = improvedCheckins - totalCheckedIn;
    return additionalCheckins * averageChargePerVisit;
  };

  return {
    noShowPercentage,
    averageChargePerVisit,
    improvements: {
      twoPercent: calculateImprovement(2),
      fivePercent: calculateImprovement(5),
      sevenPercent: calculateImprovement(7),
      tenPercent: calculateImprovement(10),
    },
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};