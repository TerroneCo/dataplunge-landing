import React from 'react';
import { MonthlyData } from '../types';

interface Props {
  data: MonthlyData;
  onChange: (data: MonthlyData) => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function MonthlyDataInput({ data, onChange }: Props) {
  return (
    <div className="grid md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
        <select
          value={data.month}
          onChange={(e) => onChange({ ...data, month: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Appointments</label>
        <input
          type="number"
          min="0"
          value={data.appointments}
          onChange={(e) => onChange({ ...data, appointments: Math.max(0, Number(e.target.value)) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Checked-In</label>
        <input
          type="number"
          min="0"
          max={data.appointments}
          value={data.checkedIn}
          onChange={(e) => onChange({ ...data, checkedIn: Math.max(0, Math.min(data.appointments, Number(e.target.value))) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Total Charges</label>
        <input
          type="number"
          min="0"
          value={data.totalCharges}
          onChange={(e) => onChange({ ...data, totalCharges: Math.max(0, Number(e.target.value)) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}