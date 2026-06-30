import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col justify-between p-6 md:p-12 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto mb-10">
        <div className="h-8 w-36 bg-slate-300 dark:bg-slate-700 rounded-lg" />
        <div className="flex gap-6">
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto flex-grow py-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-accent-cyan opacity-40 rounded" />
            <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="h-16 w-5/6 bg-slate-300 dark:bg-slate-700 rounded-xl" />
          <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-20 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="flex flex-wrap gap-4">
            <div className="h-10 w-32 bg-slate-300 dark:bg-slate-700 rounded-full" />
            <div className="h-10 w-32 bg-slate-300 dark:bg-slate-700 rounded-full" />
          </div>
        </div>
        
        {/* Right side circle skeleton */}
        <div className="flex justify-center items-center">
          <div className="w-[280px] h-[280px] rounded-full bg-slate-300 dark:bg-slate-700 shadow-lg" />
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="w-full max-w-7xl mx-auto border-t border-border-custom pt-6 mt-8 flex justify-between items-center">
        <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="flex gap-4">
          <div className="h-8 w-8 bg-slate-300 dark:bg-slate-700 rounded-full" />
          <div className="h-8 w-8 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
