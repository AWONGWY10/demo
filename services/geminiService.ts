import { GoogleGenAI, Type } from "@google/genai";
import { FinancialReport, BenchmarkResult, MarketRegion } from "../types";

// Lazy initialization helper to prevent top-level crashes if API key is missing
const getAI = () => {
  const apiKey = process.env.API_KEY || ''; 
  return new GoogleGenAI({ apiKey });
};

const METRICS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    companyName: { type: Type.STRING },
    period: { type: Type.STRING, description: "The financial period covered, e.g., 'Q1 2024', 'FY 2023'" },
    revenue: { type: Type.NUMBER },
    netProfit: { type: Type.NUMBER },
    ebitda: { type: Type.NUMBER },
    operatingExpenses: { type: Type.NUMBER },
    grossMargin: { type: Type.NUMBER, description: "Gross margin as a percentage (0-100)" },
    netMargin: { type: Type.NUMBER, description: "Net margin as a percentage (0-100)" },
    aiSummary: { type: Type.STRING, description: "Executive summary of the financial performance" },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedActions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
          description: { type: Type.STRING },
          expectedImpact: { type: Type.STRING }
        }
      }
    }
  },
  required: ["companyName", "period", "revenue", "netProfit", "ebitda", "operatingExpenses", "aiSummary", "strengths", "weaknesses", "suggestedActions"],
};

export const analyzeDocument = async (
  fileBase64: string,
  mimeType: string,
  fileName: string
): Promise<FinancialReport> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // High reasoning for financial docs
      contents: {
        parts: [
          {
            inlineData: {
              data: fileBase64,
              mimeType: mimeType,
            },
          },
          {
            text: `Analyze this financial document. Extract key financial metrics. 
            If exact numbers (like EBITDA) are not explicitly stated, estimate them based on standard formulas if data allows, or return 0.
            Provide a professional executive summary, lists of strengths and weaknesses.
            Generate a strategic Action Plan with 3-5 concrete steps to improve financial health.
            Ensure 'period' is standardized (e.g., 'Q1 2024').`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: METRICS_SCHEMA,
      },
    });

    const data = JSON.parse(response.text || "{}");

    return {
      id: crypto.randomUUID(),
      fileName,
      uploadDate: new Date().toISOString(),
      companyName: data.companyName || "Unknown Company",
      period: data.period || "Unknown Period",
      metrics: {
        revenue: data.revenue || 0,
        netProfit: data.netProfit || 0,
        ebitda: data.ebitda || 0,
        operatingExpenses: data.operatingExpenses || 0,
        grossMargin: data.grossMargin || 0,
        netMargin: data.netMargin || 0,
      },
      aiSummary: data.aiSummary || "No summary generated.",
      strengths: data.strengths || [],
      weaknesses: data.weaknesses || [],
      suggestedActions: data.suggestedActions || [],
    };
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw new Error("Failed to analyze document. Please ensure it is a valid financial report.");
  }
};

export const performBenchmark = async (
  targetReport: FinancialReport,
  historicalReport: FinancialReport | null,
  externalMarket: MarketRegion | null
): Promise<BenchmarkResult> => {
  
  // Construct the prompt content
  let promptText = `Perform a financial benchmarking analysis for ${targetReport.companyName} (${targetReport.period}).`;
  
  if (historicalReport) {
    promptText += `\n\nCompare against internal historical performance from ${historicalReport.period}.
    Historical Metrics: ${JSON.stringify(historicalReport.metrics)}
    Current Metrics: ${JSON.stringify(targetReport.metrics)}
    
    Calculate growth percentages and analyze trends.`;
  }

  if (externalMarket) {
    promptText += `\n\nAlso, perform an external market benchmarking against the ${externalMarket} market (Malaysia/Australia/Global as specified).
    Search for recent financial news, industry averages, and competitor performance in this region for the same industry as ${targetReport.companyName}.
    Compare the target company's performance against these findings.`;
  }

  const tools: any[] = [];
  if (externalMarket) {
    tools.push({ googleSearch: {} });
  }

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: promptText,
      config: {
        tools: tools,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                comparisonSummary: { type: Type.STRING },
                internalComparison: {
                    type: Type.OBJECT,
                    properties: {
                        revenueGrowth: { type: Type.NUMBER },
                        profitGrowth: { type: Type.NUMBER },
                        analysis: { type: Type.STRING }
                    }
                },
                externalComparison: {
                    type: Type.OBJECT,
                    properties: {
                        marketContext: { type: Type.STRING },
                        competitorAnalysis: { type: Type.STRING },
                    }
                }
            }
        }
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);

    // Extract grounding metadata if available (for sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks
      ?.filter((c: any) => c.web?.uri)
      .map((c: any) => ({ title: c.web.title || "Source", uri: c.web.uri }));

    return {
      comparisonSummary: data.comparisonSummary,
      internalComparison: {
        revenueGrowth: data.internalComparison?.revenueGrowth || 0,
        profitGrowth: data.internalComparison?.profitGrowth || 0,
        analysis: data.internalComparison?.analysis || "No internal comparison data generated.",
      },
      externalComparison: data.externalComparison ? {
        marketContext: data.externalComparison.marketContext,
        competitorAnalysis: data.externalComparison.competitorAnalysis,
        sources: sources || [],
      } : undefined,
    };

  } catch (error) {
    console.error("Error performing benchmark:", error);
    throw new Error("Failed to perform benchmarking analysis.");
  }
};
