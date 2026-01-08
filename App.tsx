import React, { useState, useEffect } from 'react';
import ReportUpload from './components/ReportUpload';
import MetricCard from './components/MetricCard';
import BenchmarkChart from './components/BenchmarkChart';
import CashFlowChart from './components/CashFlowChart';
import IndustryBenchmark from './components/IndustryBenchmark';
import FinancialsDetail from './components/FinancialsDetail';
import ActionPlan from './components/ActionPlan';
import { FinancialReport, ViewState, MarketRegion, BenchmarkResult } from './types';
import { performBenchmark } from './services/geminiService';

// --- DEMO DATA ---
const DEMO_DATA: FinancialReport[] = [
  {
    id: 'demo-1',
    fileName: 'TechNova_FY2023_Report.pdf',
    uploadDate: new Date().toISOString(),
    period: 'Oct 2023',
    companyName: 'TechNova Solutions',
    metrics: {
      revenue: 124500,
      netProfit: 34860,
      ebitda: 45000,
      operatingExpenses: 45200,
      grossMargin: 64,
      netMargin: 28
    },
    aiSummary: "AI-driven analysis of your financial movements for October 2023. This summary highlights anomalies and key drivers of change.",
    strengths: ["Revenue Spike: Semi-Annual Fees", "Strong Recurring Revenue Collection"],
    weaknesses: ["Marketing Spend Increase", "Slight dip in operational efficiency"],
    suggestedActions: [
        {
            title: "Optimize Software Subscriptions",
            priority: "High",
            description: "Audit current SaaS usage. We detected a 12% overlap in project management tools across departments.",
            expectedImpact: "Reduce OpEx by ~$3,500/month"
        },
        {
            title: "Review Ad Spend Allocation",
            priority: "Medium",
            description: "Shift 20% of the 'Retirement Readiness' campaign budget to LinkedIn ads which are showing higher conversion for B2B.",
            expectedImpact: "Increase lead quality by 15%"
        },
        {
            title: "Renegotiate Cloud Contracts",
            priority: "Low",
            description: "Usage patterns suggest reserved instances would be cheaper than on-demand pricing for AWS.",
            expectedImpact: "Long-term savings of 10% on infra costs"
        }
    ]
  },
  {
    id: 'demo-2',
    fileName: 'TechNova_Sep2023_Report.pdf',
    uploadDate: new Date(Date.now() - 2592000000).toISOString(),
    period: 'Sep 2023',
    companyName: 'TechNova Solutions',
    metrics: {
      revenue: 111160,
      netProfit: 28800,
      ebitda: 38000,
      operatingExpenses: 47580,
      grossMargin: 63,
      netMargin: 26
    },
    aiSummary: "September showed steady growth but higher expenses.",
    strengths: ["Consistent cash flow"],
    weaknesses: ["High travel expenses"],
    suggestedActions: [
        {
            title: "Implement Travel Policy Cap",
            priority: "Medium",
            description: "Limit domestic flight costs to economy class only.",
            expectedImpact: "Save $2k/month"
        }
    ]
  }
];

function App() {
  const [viewState, setViewState] = useState<ViewState>(ViewState.DASHBOARD);
  const [reports, setReports] = useState<FinancialReport[]>(DEMO_DATA);
  const [currentReport, setCurrentReport] = useState<FinancialReport | null>(DEMO_DATA[0]);

  // For benchmarking comparison from Dashboard
  const [compareMode, setCompareMode] = useState(false);

  const handleReportProcessed = (report: FinancialReport) => {
    setReports((prev) => [report, ...prev]);
    setCurrentReport(report);
    setViewState(ViewState.DASHBOARD);
  };

  const switchToCompare = () => {
      setViewState(ViewState.BENCHMARK);
  }

  const renderDashboard = () => {
    if (!currentReport) return null;

    return (
      <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Financial Snapshot</h2>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-slate-500 text-sm">Analyzing:</p>
                    <select 
                        value={currentReport.id}
                        onChange={(e) => {
                            const r = reports.find(item => item.id === e.target.value);
                            if (r) setCurrentReport(r);
                        }}
                        className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none cursor-pointer hover:underline focus:ring-0 p-0"
                    >
                        {reports.map(r => (
                            <option key={r.id} value={r.id}>{r.companyName} - {r.period}</option>
                        ))}
                    </select>
                </div>
              </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-white rounded-lg p-1 border border-slate-200 flex text-sm font-medium">
                <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50">Last Month</button>
                <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50">YTD</button>
                <button className="px-4 py-1.5 rounded-md bg-white text-slate-900 shadow-sm border border-slate-100">Custom</button>
             </div>
             
             <button 
                onClick={switchToCompare}
                className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 flex items-center gap-2"
             >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Compare Reports
             </button>

             <button 
                onClick={() => setViewState(ViewState.UPLOAD)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0f766e] hover:bg-[#115e59] text-white text-sm font-medium rounded-lg transition-all shadow-sm"
             >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import Data
             </button>
          </div>
        </div>

        {/* 1. Metrics Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Revenue" 
            value={`$${currentReport.metrics.revenue.toLocaleString()}`}
            change="+12%"
            trend="up"
            subtext="vs. $111,160 last month"
            iconClassName="bg-blue-50 text-blue-600"
            icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            }
          />
          <MetricCard 
            title="Total Expenses" 
            value={`$${currentReport.metrics.operatingExpenses.toLocaleString()}`}
            change="-5%"
            trend="up" 
            subtext="vs. $47,580 last month"
            iconClassName="bg-rose-50 text-rose-600"
            icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            }
          />
           <MetricCard 
            title="Gross Margin" 
            value={`${currentReport.metrics.grossMargin}%`}
            trend="neutral"
            targetText="Stable"
            subtext="Target: 65%"
            iconClassName="bg-yellow-50 text-yellow-600"
            icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            }
          />
          <MetricCard 
            title="Net Margin" 
            value={`${currentReport.metrics.netMargin}%`}
            change="+2%"
            trend="up"
            subtext="vs. 26% last month"
            iconClassName="bg-emerald-50 text-emerald-600"
            icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
            }
          />
        </div>

        {/* 2. Chart Section */}
        <div className="w-full">
            <CashFlowChart />
        </div>

        {/* 3. Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Left: Summary */}
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">What Changed & Why</h3>
                </div>
                <p className="text-slate-500 leading-relaxed mb-6">
                    {currentReport.aiSummary}
                </p>
                <button 
                    onClick={() => setViewState(ViewState.FINANCIALS)}
                    className="flex items-center text-[#0f766e] font-semibold text-sm hover:text-[#115e59]"
                >
                    View Full Report 
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>

            {/* Right: Specifics */}
            <div className="p-8 bg-slate-50/50">
                <div className="space-y-6">
                    {currentReport.strengths.slice(0, 1).map((s, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-1 bg-emerald-500 rounded-full shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{s}</h4>
                                <p className="text-xs text-slate-500 mb-2">Revenue increased by <span className="text-emerald-600 font-bold">12%</span> primarily due to the collection of semi-annual advisory fees.</p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] uppercase font-bold rounded">Recurring Revenue</span>
                                    <span className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] uppercase font-bold rounded">Fee Collection</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {currentReport.weaknesses.slice(0, 1).map((w, i) => (
                        <div key={i} className="flex gap-4">
                             <div className="w-1 bg-rose-500 rounded-full shrink-0"></div>
                             <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{w}</h4>
                                <p className="text-xs text-slate-500">This was partially offset by a <span className="text-rose-600 font-bold">5%</span> increase in expenses, driven by the Q4 "Retirement Readiness" campaign.</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Sidebar */}
      <nav className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-100 z-50 flex flex-col">
        <div className="p-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center text-[#fbbf24] shadow-md">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 19h20L12 2zm0 3l6 14H6l6-14z"/></svg>
                </div>
                <div>
                    <h1 className="text-lg font-bold text-slate-900 leading-tight">Apex Advisory</h1>
                </div>
            </div>
        </div>
        
        <div className="px-4 space-y-1 mt-2 flex-1">
            <button 
                onClick={() => setViewState(ViewState.DASHBOARD)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${viewState === ViewState.DASHBOARD ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Dashboard
            </button>
            <button 
                onClick={() => setViewState(ViewState.FINANCIALS)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${viewState === ViewState.FINANCIALS ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Financials
            </button>
            <button 
                onClick={() => setViewState(ViewState.BENCHMARK)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${viewState === ViewState.BENCHMARK ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Benchmarking
            </button>
            <button 
                onClick={() => setViewState(ViewState.ACTION_PLAN)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${viewState === ViewState.ACTION_PLAN ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Action Plan
            </button>
            <button 
                onClick={() => setViewState(ViewState.HISTORY)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${viewState === ViewState.HISTORY ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Reports
            </button>
            
        </div>

        <div className="p-4 border-t border-slate-100">
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Settings
            </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 p-8 min-h-screen">
        <header className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-semibold text-slate-800">
               {viewState === ViewState.DASHBOARD && 'Financial Performance Engine'}
               {viewState === ViewState.FINANCIALS && 'Detailed Financial Analysis'}
               {viewState === ViewState.ACTION_PLAN && 'AI Strategic Roadmap'}
               {viewState === ViewState.BENCHMARK && 'Industry Benchmarking'}
               {viewState === ViewState.UPLOAD && 'Data Ingestion'}
               {viewState === ViewState.HISTORY && 'Report Archive'}
            </h2>
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-500">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Encrypted & Anonymized
                 </div>
                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                 </div>
            </div>
        </header>

        {viewState === ViewState.UPLOAD && <ReportUpload onReportProcessed={handleReportProcessed} />}
        {viewState === ViewState.DASHBOARD && renderDashboard()}
        {viewState === ViewState.FINANCIALS && currentReport && <FinancialsDetail report={currentReport} />}
        {viewState === ViewState.ACTION_PLAN && currentReport && <ActionPlan report={currentReport} />}
        {viewState === ViewState.BENCHMARK && <IndustryBenchmark />}
        {viewState === ViewState.HISTORY && (
            <div className="space-y-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Report History</h2>
                 {reports.map(r => (
                     <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex justify-between items-center hover:shadow-md transition-all">
                         <div>
                             <h4 className="font-bold text-slate-900 text-lg">{r.companyName}</h4>
                             <p className="text-slate-500">{r.period} • {new Date(r.uploadDate).toLocaleDateString()}</p>
                         </div>
                         <button onClick={() => { setCurrentReport(r); setViewState(ViewState.DASHBOARD); }} className="px-6 py-2 bg-slate-100 text-slate-600 font-medium rounded-lg hover:bg-slate-200">
                             View Analysis
                         </button>
                     </div>
                 ))}
             </div>
        )}
      </main>
    </div>
  );
}

export default App;