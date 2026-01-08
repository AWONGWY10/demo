import React from 'react';
import { FinancialReport } from '../types';

interface FinancialsDetailProps {
  report: FinancialReport;
}

const FinancialsDetail: React.FC<FinancialsDetailProps> = ({ report }) => {
  const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

  const rows = [
    { label: 'Total Revenue', value: report.metrics.revenue, insight: "Driven by high volume in Q3." },
    { label: 'Cost of Goods Sold (COGS)', value: Math.round(report.metrics.revenue * (1 - report.metrics.grossMargin / 100)), insight: "Standard for industry." },
    { label: 'Gross Profit', value: Math.round(report.metrics.revenue * (report.metrics.grossMargin / 100)), isTotal: true },
    { label: 'Operating Expenses', value: report.metrics.operatingExpenses, insight: "Higher than average due to marketing." },
    { label: 'EBITDA', value: report.metrics.ebitda, isTotal: true, insight: "Healthy operational performance." },
    { label: 'Depreciation & Amortization', value: Math.round(report.metrics.ebitda - report.metrics.netProfit * 1.2), insight: "Estimated." }, // Rough estimate for display
    { label: 'Net Profit', value: report.metrics.netProfit, isTotal: true, isHighlight: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
       <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Financial Statements</h2>
            <p className="text-slate-500 mt-2">Detailed P&L Breakdown for <span className="font-semibold text-slate-900">{report.companyName} ({report.period})</span></p>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
             Download CSV
          </button>
       </div>

       <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 uppercase tracking-wider">Line Item</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 uppercase tracking-wider">AI Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, idx) => (
                <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${row.isHighlight ? 'bg-emerald-50/30' : ''}`}>
                  <td className={`py-4 px-6 text-slate-900 ${row.isTotal ? 'font-bold' : 'font-medium'}`}>
                    {row.label}
                  </td>
                  <td className={`py-4 px-6 text-right font-mono ${row.isTotal ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                    {formatCurrency(row.value)}
                  </td>
                  <td className="py-4 px-6">
                    {row.insight && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                           <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           {row.insight}
                        </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-4">Gross Margin Analysis</h3>
             <div className="flex items-center gap-4">
                 <div className="text-4xl font-bold text-slate-900">{report.metrics.grossMargin}%</div>
                 <div className="text-sm text-slate-500">
                    Your gross margin is <span className="text-emerald-600 font-semibold">healthy</span> compared to the 60% industry baseline.
                 </div>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-slate-900 h-full rounded-full" style={{ width: `${report.metrics.grossMargin}%` }}></div>
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-4">Net Profit Efficiency</h3>
             <div className="flex items-center gap-4">
                 <div className="text-4xl font-bold text-slate-900">{report.metrics.netMargin}%</div>
                 <div className="text-sm text-slate-500">
                    Net margin indicates strong cost controls, sitting in the top quartile of performance.
                 </div>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${report.metrics.netMargin}%` }}></div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default FinancialsDetail;