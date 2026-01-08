import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string; // e.g., "+12%"
  trend?: 'up' | 'down' | 'neutral'; // determines color of badge
  subtext?: string;
  icon: React.ReactNode;
  iconClassName: string; // e.g. "bg-blue-100 text-blue-600"
  targetText?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  subtext, 
  icon, 
  iconClassName,
  targetText
}) => {
  
  let badgeClass = "bg-slate-100 text-slate-600";
  let trendIcon = "—";

  if (trend === 'up') {
    badgeClass = "bg-emerald-100 text-emerald-700";
    trendIcon = "↗";
  } else if (trend === 'down') {
    badgeClass = "bg-rose-100 text-rose-700";
    trendIcon = "↘";
  } else if (trend === 'neutral') {
      badgeClass = "bg-slate-100 text-slate-600";
      trendIcon = "—";
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${iconClassName}`}>
          {icon}
        </div>
        {change && (
          <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${badgeClass}`}>
            <span>{trendIcon}</span>
            <span>{change}</span>
          </div>
        )}
        {targetText && (
             <div className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                {targetText}
             </div>
        )}
      </div>
      
      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <div className="text-3xl font-bold text-slate-900 tracking-tight">{value}</div>
        {subtext && <p className="text-slate-400 text-xs mt-2">{subtext}</p>}
      </div>
    </div>
  );
};

export default MetricCard;