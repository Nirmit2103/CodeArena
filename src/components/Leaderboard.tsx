import React, { useState } from 'react';
import { Trophy, Medal, Star, Search, ArrowUp, ArrowDown, Filter, Zap, Code2 } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  problemsSolved: number;
  winRate: number;
  streak: number;
  tier: string;
  change: number;
}

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [searchQuery, setSearchQuery] = useState('');

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "CodeMaster",
      score: 15420,
      problemsSolved: 342,
      winRate: 76,
      streak: 15,
      tier: "Diamond",
      change: 2
    },
    {
      rank: 2,
      username: "AlgoNinja",
      score: 14230,
      problemsSolved: 315,
      winRate: 82,
      streak: 12,
      tier: "Diamond",
      change: -1
    },
    {
      rank: 3,
      username: "BinaryQueen",
      score: 13580,
      problemsSolved: 298,
      winRate: 79,
      streak: 18,
      tier: "Platinum",
      change: 3
    },
    {
      rank: 4,
      username: "RuntimeTerror",
      score: 12890,
      problemsSolved: 275,
      winRate: 71,
      streak: 9,
      tier: "Platinum",
      change: 0
    },
    {
      rank: 5,
      username: "StackOverflow",
      score: 12100,
      problemsSolved: 260,
      winRate: 68,
      streak: 5,
      tier: "Gold",
      change: 2
    },
    {
      rank: 6,
      username: "NullPointer",
      score: 11540,
      problemsSolved: 242,
      winRate: 65,
      streak: 7,
      tier: "Gold",
      change: -2
    },
    {
      rank: 7,
      username: "SyntaxError",
      score: 10870,
      problemsSolved: 225,
      winRate: 63,
      streak: 4,
      tier: "Silver",
      change: 1
    },
    {
      rank: 8,
      username: "InfiniteLoop",
      score: 10230,
      problemsSolved: 210,
      winRate: 60,
      streak: 3,
      tier: "Silver",
      change: -1
    },
    {
      rank: 9,
      username: "SegFault",
      score: 9750,
      problemsSolved: 198,
      winRate: 58,
      streak: 2,
      tier: "Bronze",
      change: 0
    },
    {
      rank: 10,
      username: "CodeBreaker",
      score: 9240,
      problemsSolved: 185,
      winRate: 55,
      streak: 1,
      tier: "Bronze",
      change: 1
    }
  ];

  const getTierColor = (tier: string) => {
    const colors = {
      'Diamond': 'text-cyan-400',
      'Platinum': 'text-indigo-400',
      'Gold': 'text-yellow-400',
      'Silver': 'text-gray-400',
      'Bronze': 'text-orange-400'
    };
    return colors[tier as keyof typeof colors] || 'text-gray-400';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy size={20} className="text-yellow-400" />;
    if (rank === 2) return <Medal size={20} className="text-gray-300" />;
    if (rank === 3) return <Medal size={20} className="text-orange-400" />;
    return <span className="text-gray-400">#{rank}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Leaderboard</h1>
          <p className="text-gray-400 mt-1">Top performers in competitive programming</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F0F13] border border-indigo-500/10 rounded-lg 
                       text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {['weekly', 'monthly', 'all-time'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors
                ${timeRange === range 
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#0F0F13] border border-transparent'}`}
            >
              {range.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Trophy size={16} />
            <span>Top Score</span>
          </div>
          <div className="text-2xl font-bold text-white">15,420</div>
        </div>
        <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Code2 size={16} />
            <span>Problems Solved</span>
          </div>
          <div className="text-2xl font-bold text-white">342</div>
        </div>
        <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Zap size={16} />
            <span>Active Users</span>
          </div>
          <div className="text-2xl font-bold text-white">1,248</div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Player</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Score</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Problems</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Win Rate</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Streak</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {leaderboardData.map((entry) => (
                <tr key={entry.username} className="hover:bg-gray-800/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getRankBadge(entry.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{entry.username}</span>
                      <span className={`text-sm ${getTierColor(entry.tier)}`}>{entry.tier}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{entry.score.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{entry.problemsSolved}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{entry.winRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Zap size={16} />
                      <span>{entry.streak}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-1 
                      ${entry.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {entry.change > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      <span>{Math.abs(entry.change)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 