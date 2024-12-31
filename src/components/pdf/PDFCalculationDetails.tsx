import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { MonthlyData } from '../../types';
import { formatCurrency } from '../../utils/calculations';

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  formula: {
    fontSize: 10,
    marginBottom: 5,
    color: '#4B5563',
  },
  calculation: {
    fontSize: 10,
    fontFamily: 'Courier',
    marginBottom: 10,
  },
  explanation: {
    fontSize: 10,
    color: '#1F2937',
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 4,
  },
});

interface Props {
  data: MonthlyData[];
  metric: 'noShow' | 'averageCharge' | 'improvement';
  improvementPercent?: number;
}

export function PDFCalculationDetails({ data, metric, improvementPercent }: Props) {
  const totalAppointments = data.reduce((sum, month) => sum + month.appointments, 0);
  const totalCheckedIn = data.reduce((sum, month) => sum + month.checkedIn, 0);
  const totalCharges = data.reduce((sum, month) => sum + month.totalCharges, 0);
  const noShowPercentage = ((totalAppointments - totalCheckedIn) / totalAppointments) * 100;
  const averageChargePerVisit = totalCharges / totalCheckedIn;

  const renderNoShowCalculation = () => (
    <View style={styles.section}>
      <Text style={styles.formula}>No-Show Rate = (Total Appointments - Total Check-ins) / Total Appointments × 100</Text>
      <Text style={styles.calculation}>
        = ({totalAppointments} - {totalCheckedIn}) / {totalAppointments} × 100
        = {noShowPercentage.toFixed(1)}%
      </Text>
      <Text style={styles.explanation}>
        Out of {totalAppointments} total scheduled appointments, {totalCheckedIn} patients showed up. 
        This means {totalAppointments - totalCheckedIn} patients didn't show up. 
        When we convert this to a percentage, {noShowPercentage.toFixed(1)}% of appointments were missed.
      </Text>
    </View>
  );

  const renderAverageChargeCalculation = () => (
    <View style={styles.section}>
      <Text style={styles.formula}>Average Charge = Total Charges / Total Check-ins</Text>
      <Text style={styles.calculation}>
        = {formatCurrency(totalCharges)} / {totalCheckedIn}
        = {formatCurrency(averageChargePerVisit)}
      </Text>
      <Text style={styles.explanation}>
        When we take the total revenue of {formatCurrency(totalCharges)} and divide it by the {totalCheckedIn} patients 
        who showed up, we find that each patient visit is worth about {formatCurrency(averageChargePerVisit)} on average.
      </Text>
    </View>
  );

  const renderImprovementCalculation = () => {
    if (!improvementPercent) return null;
    
    const improvedNoShowRate = noShowPercentage - improvementPercent;
    const improvedCheckins = totalAppointments * ((100 - improvedNoShowRate) / 100);
    const additionalCheckins = improvedCheckins - totalCheckedIn;
    const additionalRevenue = additionalCheckins * averageChargePerVisit;

    return (
      <View style={styles.section}>
        <Text style={styles.formula}>Additional Revenue with {improvementPercent}% Improvement:</Text>
        <Text style={styles.calculation}>
          1. Improved No-Show Rate = {noShowPercentage.toFixed(1)}% - {improvementPercent}% = {improvedNoShowRate.toFixed(1)}%{'\n'}
          2. Improved Check-ins = {totalAppointments} × (100% - {improvedNoShowRate.toFixed(1)}%) = {improvedCheckins.toFixed(1)}{'\n'}
          3. Additional Check-ins = {improvedCheckins.toFixed(1)} - {totalCheckedIn} = {additionalCheckins.toFixed(1)}{'\n'}
          4. Additional Revenue = {additionalCheckins.toFixed(1)} × {formatCurrency(averageChargePerVisit)} = {formatCurrency(additionalRevenue)}
        </Text>
        <Text style={styles.explanation}>
          If we reduce no-shows by {improvementPercent}%, your no-show rate would drop from {noShowPercentage.toFixed(1)}% 
          to {improvedNoShowRate.toFixed(1)}%. This means about {Math.round(additionalCheckins)} more patients would show up 
          for their appointments. Since each patient visit is worth {formatCurrency(averageChargePerVisit)} on average, 
          these additional visits would bring in {formatCurrency(additionalRevenue)} more revenue.
        </Text>
      </View>
    );
  };

  return (
    <View>
      {metric === 'noShow' && renderNoShowCalculation()}
      {metric === 'averageCharge' && renderAverageChargeCalculation()}
      {metric === 'improvement' && renderImprovementCalculation()}
    </View>
  );
}