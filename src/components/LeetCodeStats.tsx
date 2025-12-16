import React from 'react';

interface StatItemProps {
  label: string;
  value: string | number;
}

export const StatItem = ({ label, value }: StatItemProps) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400">{label}</span>
    <span className="text-white">{value}</span>
  </div>
);

interface LeetCodeStatsProps {
  data: {
    error?: string;
    totalSolved?: number;
    rating?: number;
    rank?: number | string;
    contests?: number;
    rateLimitRemaining?: number;
  };
}

const LeetCodeStats = ({ data }: LeetCodeStatsProps) => {
  return (
    <div className="bg-[#0F0F13] p-4 rounded-lg border border-indigo-500/10">
      <div className="flex items-center gap-3 mb-4">
        <img src="/leetcode-logo.svg" className="w-8 h-8" alt="LeetCode" />
        <h3 className="text-lg font-semibold">LeetCode</h3>
      </div>
      
      {data.error ? (
        <div className="text-red-400 text-sm">{data.error}</div>
      ) : (
        <div className="space-y-2">
          <StatItem label="Problems Solved" value={data.totalSolved ?? 0} />
          <StatItem label="Contest Rating" value={data.rating ?? 0} />
          <StatItem label="Global Rank" value={`#${data.rank ?? 'unrated'}`} />
          <StatItem label="Contests Joined" value={data.contests ?? 0} />
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Updates every 6 hours. {data.rateLimitRemaining ?? 10} requests remaining.
      </div>
    </div>
  );
};

export default LeetCodeStats; 