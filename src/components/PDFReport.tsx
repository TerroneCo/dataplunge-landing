import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { MonthlyData, CalculationResults } from '../types';
import { PDFCalculationDetails } from './pdf/PDFCalculationDetails';
import { formatCurrency } from '../utils/calculations';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#F3F4F6',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
  },
  metric: {
    marginBottom: 15,
  },
  metricLabel: {
    color: '#4B5563',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calculationDetails: {
    marginTop: 5,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
  },
});

interface Props {
  monthlyData: MonthlyData[];
  results: CalculationResults;
}

export function PDFReport({ monthlyData, results }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>No-Show Impact Analysis Report</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Data</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Month</Text>
              <Text style={styles.tableCell}>Appointments</Text>
              <Text style={styles.tableCell}>Checked In</Text>
              <Text style={styles.tableCell}>Total Charges</Text>
            </View>
            {monthlyData.map((data, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.month}</Text>
                <Text style={styles.tableCell}>{data.appointments}</Text>
                <Text style={styles.tableCell}>{data.checkedIn}</Text>
                <Text style={styles.tableCell}>{formatCurrency(data.totalCharges)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Metrics</Text>
          
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>No-Show Rate</Text>
            <Text style={styles.metricValue}>{results.noShowPercentage.toFixed(1)}%</Text>
            <View style={styles.calculationDetails}>
              <PDFCalculationDetails data={monthlyData} metric="noShow" />
            </View>
          </View>

          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Average Charge per Visit</Text>
            <Text style={styles.metricValue}>{formatCurrency(results.averageChargePerVisit)}</Text>
            <View style={styles.calculationDetails}>
              <PDFCalculationDetails data={monthlyData} metric="averageCharge" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Potential Revenue Improvements</Text>
          {[
            { percent: 2, value: results.improvements.twoPercent },
            { percent: 5, value: results.improvements.fivePercent },
            { percent: 7, value: results.improvements.sevenPercent },
            { percent: 10, value: results.improvements.tenPercent },
          ].map(({ percent, value }) => (
            <View key={percent} style={styles.metric}>
              <Text style={styles.metricLabel}>{percent}% Improvement</Text>
              <Text style={styles.metricValue}>{formatCurrency(value)}</Text>
              <View style={styles.calculationDetails}>
                <PDFCalculationDetails 
                  data={monthlyData} 
                  metric="improvement" 
                  improvementPercent={percent} 
                />
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}