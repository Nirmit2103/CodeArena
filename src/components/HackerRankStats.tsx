import React from 'react';
import { StatItem } from './LeetCodeStats';

interface HackerRankStatsProps {
  data: {
    username?: string;
    solved?: number;
    stars?: number;
    badges?: number;
    error?: string;
  };
}

const HackerRankStats = ({ data }: HackerRankStatsProps) => {
  return (
    <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
      <div className="flex items-center gap-3 mb-4">
        <img src="/hackerrank-logo.svg" className="w-8 h-8" alt="HackerRank" />
        <h3 className="text-lg font-semibold">HackerRank</h3>
      </div>
      
      {data.error ? (
        <div className="text-red-400 text-sm">{data.error}</div>
      ) : (
        <div className="space-y-3">
          <StatItem label="Username" value={data.username || 'N/A'} />
          <StatItem label="Problems Solved" value={data.solved || 0} />
          <StatItem label="Stars Earned" value={data.stars || 0} />
          <StatItem label="Badges Earned" value={data.badges || 0} />
        </div>
      )}
    </div>
  );
};

export default HackerRankStats; 