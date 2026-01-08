import React, { useState } from 'react';
import { analyzeDocument } from '../services/geminiService';
import { FinancialReport } from '../types';

interface ReportUploadProps {
  onReportProcessed: (report: FinancialReport) => void;
}

const ReportUpload: React.FC<ReportUploadProps> = ({ onReportProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;
    setError(null);
    setIsProcessing(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1];
        try {
            const report = await analyzeDocument(base64String, file.type, file.name);
            onReportProcessed(report);
        } catch (err: any) {
             setError(err.message || "Failed to analyze document.");
        } finally {
            setIsProcessing(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read file.");
        setIsProcessing(false);
      }
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ease-in-out
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-slate-300 hover:border-blue-400 bg-white'
          }
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-slate-100 rounded-full">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Upload Financial Document</h3>
            <p className="text-slate-500 mt-2 text-sm">Drag and drop your PDF, Image, or CSV here</p>
          </div>
          
          <label className="relative cursor-pointer">
            <span className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20">
              Browse Files
            </span>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.png,.jpg,.jpeg,.csv"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              disabled={isProcessing}
            />
          </label>
        </div>

        {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-600 font-medium animate-pulse">Analyzing financial data with Gemini AI...</p>
            </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
            <div className="text-blue-600 font-semibold mb-1">Upload</div>
            <div className="text-xs text-slate-500">PDF, Images, CSV supported</div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
            <div className="text-purple-600 font-semibold mb-1">Analyze</div>
            <div className="text-xs text-slate-500">Instant extraction of KPIs</div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
            <div className="text-emerald-600 font-semibold mb-1">Benchmark</div>
            <div className="text-xs text-slate-500">Compare with Market (MY/AU)</div>
        </div>
      </div>
    </div>
  );
};

export default ReportUpload;