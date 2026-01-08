import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { FinancialReport } from '../types';

interface BenchmarkChartProps {
  reportA: FinancialReport;
  reportB?: FinancialReport;
}

const BenchmarkChart: React.FC<BenchmarkChartProps> = ({ reportA, reportB }) => {
  const data = [
    {
      name: 'Revenue',
      [reportA.period]: reportA.metrics.revenue,
      [reportB?.period || 'Previous']: reportB?.metrics.revenue || 0,
    },
    {
      name: 'Net Profit',
      [reportA.period]: reportA.metrics.netProfit,
      [reportB?.period || 'Previous']: reportB?.metrics.netProfit || 0,
    },
    {
      name: 'EBITDA',
      [reportA.period]: reportA.metrics.ebitda,
      [reportB?.period || 'Previous']: reportB?.metrics.ebitda || 0,
    },
    {
      name: 'Op. Expenses',
      [reportA.period]: reportA.metrics.operatingExpenses,
      [reportB?.period || 'Previous']: reportB?.metrics.operatingExpenses || 0,
    },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Comparative Financials</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis 
            tickFormatter={formatCurrency} 
            stroke="#64748b"
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#0f172a' }}
            cursor={{fill: '#f1f5f9'}}
            formatter={(value: number) => ['$' + value.toLocaleString(), '']}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey={reportA.period} fill="#3b82f6" radius={[4, 4, 0, 0]} name={`${reportA.companyName} (${reportA.period})`} />
          {reportB && (
            <Bar dataKey={reportB.period} fill="#10b981" radius={[4, 4, 0, 0]} name={`${reportB.companyName} (${reportB.period})`} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BenchmarkChart;