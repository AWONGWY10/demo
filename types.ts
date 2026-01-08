export interface FinancialMetrics {
  revenue: number;
  netProfit: number;
  ebitda: number;
  operatingExpenses: number;
  grossMargin: number; // percentage
  netMargin: number; // percentage
}

export interface ActionPlanItem {
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  expectedImpact: string;
}

export interface FinancialReport {
  id: string;
  fileName: string;
  uploadDate: string;
  period: string; // e.g., "Q1 2024", "FY 2023"
  companyName: string;
  metrics: FinancialMetrics;
  aiSummary: string;
  strengths: string[];
  weaknesses: string[];
  suggestedActions: ActionPlanItem[]; // New field
  rawContent?: string; 
}

export interface BenchmarkResult {
  comparisonSummary: string;
  internalComparison: {
    revenueGrowth: number; // percentage
    profitGrowth: number; // percentage
    analysis: string;
  };
  externalComparison?: {
    marketContext: string;
    competitorAnalysis: string;
    sources: Array<{ title: string; uri: string }>;
  };
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  FINANCIALS = 'FINANCIALS', // New
  ACTION_PLAN = 'ACTION_PLAN', // New
  UPLOAD = 'UPLOAD',
  HISTORY = 'HISTORY',
  BENCHMARK = 'BENCHMARK',
}

export enum MarketRegion {
  MY = 'MY', // Malaysia
  AU = 'AU', // Australia
  GLOBAL = 'GLOBAL',
}