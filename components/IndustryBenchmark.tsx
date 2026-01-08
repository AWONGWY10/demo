import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';

const IndustryBenchmark: React.FC = () => {
  // Mock data for competitive position
  const scatterData = [
    { x: 100, y: 200, z: 200, name: 'Peer A' },
    { x: 120, y: 100, z: 260, name: 'Peer B' },
    { x: 170, y: 300, z: 400, name: 'Peer C' },
    { x: 140, y: 250, z: 280, name: 'Peer D' },
    { x: 150, y: 400, z: 500, name: 'Peer E' },
    { x: 110, y: 280, z: 200, name: 'Peer F' },
    { x: 350, y: 250, z: 1000, name: 'You', isUser: true }, // The user
    { x: 300, y: 150, z: 300, name: 'Peer G' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Industry Benchmarking</h2>
          <p className="text-slate-500 mt-2 text-lg">
            Analyzing your performance against <span className="font-bold text-slate-900">45 peer firms</span> in the Technology sector.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Software & IT</option>
            <option>SaaS</option>
            <option>Fintech</option>
          </select>
          <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500">
            <option>$1M - $5M Rev</option>
            <option>$5M - $10M Rev</option>
          </select>
          <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Australia</option>
            <option>Malaysia</option>
            <option>Global</option>
          </select>
          <button className="px-6 py-2.5 bg-[#0f766e] hover:bg-[#115e59] text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Update
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profitability (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">Profitability Ratios</h3>
                <span className="text-slate-500 text-sm">Gross Profit & EBITDA Margin Comparison</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#0f766e]"></span> Your Firm</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-slate-300"></span> Industry Median</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-300"></span> Top 25%</div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Gross Profit Margin */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">Gross Profit Margin</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  +4.2% vs Median 
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                </span>
              </div>
              <div className="relative h-8 bg-slate-50 rounded-full w-full overflow-hidden border border-slate-100">
                {/* Median Line */}
                <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-slate-400 z-10" style={{ left: '65%' }}>
                   <span className="absolute -top-6 -left-3 text-[10px] font-bold text-slate-400">70%</span>
                </div>
                {/* Your Firm Bar */}
                <div className="absolute top-0 left-0 h-full bg-[#0f766e] rounded-full flex items-center justify-end px-3 text-xs font-bold text-white z-20" style={{ width: '69.2%' }}>
                  69.2%
                </div>
                {/* Top 25% Marker (Just visual for demo) */}
                <div className="absolute top-0 bottom-0 w-1 bg-slate-200 z-0" style={{ left: '80%' }}></div>
              </div>
            </div>

            {/* EBITDA Margin */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">EBITDA Margin</span>
                <span className="font-bold text-rose-500 flex items-center gap-1">
                  -2.1% vs Median 
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </span>
              </div>
              <div className="relative h-8 bg-slate-50 rounded-full w-full overflow-hidden border border-slate-100">
                {/* Median Line */}
                <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-slate-400 z-10" style={{ left: '30%' }}>
                    <span className="absolute -top-6 -left-3 text-[10px] font-bold text-slate-400">25%</span>
                </div>
                {/* Your Firm Bar */}
                <div className="absolute top-0 left-0 h-full bg-[#0e7490] rounded-full flex items-center justify-end px-3 text-xs font-bold text-white z-20" style={{ width: '15.9%' }}>
                  15.9%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shrink-0">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Insight: High OpEx Impact</h4>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                While your Gross Margin is healthy, your EBITDA is lagging due to Operating Expenses being 
                <span className="font-semibold text-slate-900"> 12% higher</span> than the peer median. Consider reviewing software subscriptions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Market Context (Span 1) */}
        <div className="bg-[#fffbeb] rounded-2xl border border-yellow-100 p-8 shadow-sm h-full flex flex-col relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full blur-2xl opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-yellow-400 text-white rounded-lg shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Market Context</h3>
          </div>

          <div className="space-y-6 relative z-10 flex-1">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Macro View: Australia</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Persistent inflation in the services sector (4.2% YoY) is driving wage pressures for Australian IT firms. 
                Peers are responding by increasing billable rates by an average of 8% this quarter.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Business Implication</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                If your <span className="font-semibold text-[#0f766e]">labour efficiency ratio</span> remains static while wages rise, net margins will compress. 
                Review your rate card against the new industry standard.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-yellow-200/50 relative z-10">
            <button className="text-sm font-semibold text-[#0f766e] flex items-center gap-1 hover:gap-2 transition-all">
              Read full market report 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Current Ratio */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <h4 className="text-sm font-medium text-[#0f766e]">Current Ratio (Liquidity)</h4>
             <div className="text-slate-300">
               <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>
             </div>
          </div>
          <div className="mt-4">
             <div className="flex items-baseline gap-2">
               <span className="text-4xl font-bold text-slate-900">1.8x</span>
               <span className="text-sm text-slate-400 font-medium">vs Peer 1.5x</span>
             </div>
             <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '70%' }}></div>
             </div>
             <div className="mt-2 text-xs font-medium text-emerald-600">Healthy buffer</div>
          </div>
        </div>

        {/* Card 2: Revenue Growth */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <h4 className="text-sm font-medium text-[#0f766e]">YoY Revenue Growth</h4>
             <div className="text-slate-300">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
             </div>
          </div>
          <div className="mt-4">
             <div className="flex items-baseline gap-2">
               <span className="text-4xl font-bold text-slate-900">12%</span>
               <span className="text-sm text-slate-400 font-medium">vs Peer 18%</span>
             </div>
             <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '45%' }}></div>
             </div>
             <div className="mt-2 text-xs font-medium text-yellow-600">Lagging sector momentum</div>
          </div>
        </div>

        {/* Card 3: Competitive Position Map */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
           <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium text-[#0f766e]">Competitive Position</h4>
              <span className="text-[10px] font-bold border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">MAP</span>
           </div>
           
           <div className="h-[120px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                    <XAxis type="number" dataKey="x" hide />
                    <YAxis type="number" dataKey="y" hide />
                    <ZAxis type="number" dataKey="z" range={[50, 400]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Firms" data={scatterData} fill="#94a3b8">
                        {scatterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isUser ? '#0f766e' : '#cbd5e1'} stroke={entry.isUser ? '#fff' : 'none'} strokeWidth={2} />
                        ))}
                    </Scatter>
                </ScatterChart>
             </ResponsiveContainer>
           </div>
           
           <div className="mt-2 flex justify-between items-center text-[10px] text-slate-400 font-medium">
             <span>X: Revenue</span>
             <span className="flex items-center gap-1">
                 <span className="w-2 h-2 rounded-full bg-[#0f766e]"></span> You
             </span>
             <span>Y: Profitability</span>
           </div>
        </div>
      </div>

      {/* Footer Warning */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </div>
              <div>
                  <h5 className="text-sm font-bold text-slate-900">Insufficient Data for "Marketing Spend"</h5>
                  <p className="text-xs text-slate-500">We require at least 5 verified peer data points to display this benchmark to preserve anonymity.</p>
              </div>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              Contribute Data
          </button>
      </div>
    </div>
  );
};

export default IndustryBenchmark;