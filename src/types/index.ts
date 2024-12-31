export interface MonthlyData {
  month: string;
  appointments: number;
  checkedIn: number;
  totalCharges: number;
}

export interface CalculationResults {
  noShowPercentage: number;
  averageChargePerVisit: number;
  improvements: {
    twoPercent: number;
    fivePercent: number;
    sevenPercent: number;
    tenPercent: number;
  };
}