import React from 'react';
import { FinancialReport, ActionPlanItem } from '../types';

interface ActionPlanProps {
  report: FinancialReport;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ report }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
       <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Strategic Action Plan</h2>
          <p className="text-slate-500 mt-2">AI-suggested roadmap based on <span className="font-semibold">{report.fileName}</span></p>
       </div>

       <div className="grid gap-6">
          {report.suggestedActions.length > 0 ? (
              report.suggestedActions.map((action, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                        action.priority === 'High' ? 'bg-rose-500' : action.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}></div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                 action.priority === 'High' 
                                 ? 'bg-rose-50 text-rose-600 border-rose-100' 
                                 : action.priority === 'Medium' 
                                 ? 'bg-amber-50 text-amber-600 border-amber-100' 
                                 : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                             }`}>
                                {action.priority} Priority
                             </span>
                             <h3 className="text-lg font-bold text-slate-900">{action.title}</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{action.description}</p>
                    </div>

                    <div className="md:w-64 bg-slate-50 rounded-lg p-4 border border-slate-100 shrink-0">
                        <div className="flex items-center gap-2 mb-2 text-indigo-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            <span className="text-xs font-bold uppercase">Expected Impact</span>
                        </div>
                        <p className="text-sm text-slate-700 font-medium">{action.expectedImpact}</p>
                    </div>
                </div>
              ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500">No specific action plan generated for this report. Try re-analyzing the document.</p>
            </div>
          )}
       </div>
    </div>
  );
};

export default ActionPlan;