import React from 'react';
import { Trophy, Target, Code2, Flame, ArrowUp, Users, Calendar } from 'lucide-react';

interface PlatformProgress {
  name: string;
  color: string;
  data: number[];
}

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-4 border border-indigo-500/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Trophy size={20} className="text-indigo-400" />
            </div>
            <span className="text-gray-400">Rank</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-white">#42</h3>
            <span className="text-green-400 text-sm flex items-center">
              <ArrowUp size={14} />
              +5
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-4 border border-indigo-500/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Target size={20} className="text-indigo-400" />
            </div>
            <span className="text-gray-400">Problems Solved</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-white">248</h3>
            <span className="text-xs text-gray-500">/ 500 goal</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-4 border border-indigo-500/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Flame size={20} className="text-indigo-400" />
            </div>
            <span className="text-gray-400">Current Streak</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-white">12</h3>
            <span className="text-xs text-gray-500">days</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-4 border border-indigo-500/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Code2 size={20} className="text-indigo-400" />
            </div>
            <span className="text-gray-400">Tournaments</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-white">8</h3>
            <span className="text-xs text-gray-500">participated</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Tournaments */}
        <div className="lg:col-span-2 bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Upcoming Tournaments</h2>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm">View All</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#0A0A0B] rounded-lg border border-indigo-500/10">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <Trophy size={24} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">Algorithm Masters Challenge</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar size={14} />
                      <span>Tomorrow, 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users size={14} />
                      <span>128 participants</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg mt-1">
                  <Code2 size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-300">Solved <span className="text-white font-medium">Binary Tree Maximum Path Sum</span></p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-[#0F0F13] rounded-2xl border-2 border-indigo-500/20 p-6 transform perspective-1000">
        <h2 className="text-2xl font-bold text-white mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Weekly Coding Activity
        </h2>

        <div className="grid grid-cols-7 gap-4 mb-6">
          {Array.from({ length: 7 }).map((_, i) => {
            const dayData = {
              LeetCode: [15, 20, 8, 25, 18, 12, 30][i],
              Codeforces: [3, 5, 2, 4, 6, 1, 4][i],
              GitHub: [8, 12, 5, 10, 7, 9, 15][i]
            };

            return (
              <div key={i} className="group relative perspective-1000">
                {/* 3D Card Container */}
                <div className="relative h-32 transition-all duration-500 group-hover:rotate-x-15 group-hover:rotate-y-15 group-hover:translate-z-10">
                  {/* Back Layer Shadow */}
                  <div className="absolute inset-0 bg-purple-400/10 blur-lg rounded-xl" />
                  
                  {/* Main 3D Card */}
                  <div className="absolute inset-0 bg-[#161618] rounded-xl border-2 border-indigo-500/20 shadow-2xl transform-style-preserve-3d">
                    {/* Platform Bars */}
                    <div className="flex flex-col justify-end h-full p-2 gap-1">
                      {/* LeetCode Bar */}
                      <div 
                        className="relative bg-gradient-to-b from-amber-400 to-amber-500 rounded-lg transition-all hover:scale-y-105"
                        style={{ height: `${(dayData.LeetCode / 30) * 70}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg" />
                        <div className="absolute bottom-0 w-full h-1 bg-amber-300/50 rounded-b-lg" />
                      </div>

                      {/* Codeforces Bar */}
                      <div
                        className="relative bg-gradient-to-b from-red-400 to-red-500 rounded-lg transition-all hover:scale-y-105"
                        style={{ height: `${(dayData.Codeforces / 6) * 70}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg" />
                        <div className="absolute bottom-0 w-full h-1 bg-red-300/50 rounded-b-lg" />
                      </div>

                      {/* GitHub Bar */}
                      <div
                        className="relative bg-gradient-to-b from-purple-400 to-purple-500 rounded-lg transition-all hover:scale-y-105"
                        style={{ height: `${(dayData.GitHub / 15) * 70}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg" />
                        <div className="absolute bottom-0 w-full h-1 bg-purple-300/50 rounded-b-lg" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Stats Card */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-300 z-20">
                  <div className="bg-[#1A1B1F] px-4 py-3 rounded-xl border border-indigo-500/30 shadow-2xl transform -rotate-x-15">
                    <div className="space-y-2 min-w-[160px]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Total</span>
                        <span className="text-indigo-400 font-medium">
                          {dayData.LeetCode + dayData.Codeforces + dayData.GitHub}
                        </span>
                      </div>
                      <div className="h-px bg-indigo-500/20" />
                      {Object.entries(dayData).map(([platform, value]) => (
                        <div key={platform} className="flex items-center justify-between text-xs">
                          <span className={
                            platform === 'LeetCode' ? 'text-amber-400' :
                            platform === 'Codeforces' ? 'text-red-400' : 
                            'text-purple-400'
                          }>
                            {platform}
                          </span>
                          <span className="text-gray-300">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Day Label */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-10 transition-all duration-300">
                  <div className="bg-[#1A1B1F] px-3 py-1 rounded-full border border-indigo-500/30 shadow-xl">
                    <span className="text-xs font-medium bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Glowing Legend */}
        <div className="flex justify-center gap-6 mt-8">
          {[
            { name: 'LeetCode', color: 'from-amber-400 to-amber-500' },
            { name: 'Codeforces', color: 'from-red-400 to-red-500' },
            { name: 'GitHub', color: 'from-purple-400 to-purple-500' }
          ].map((platform) => (
            <div key={platform.name} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-lg bg-gradient-to-br ${platform.color} shadow-glow`} />
              <span className="text-sm font-medium text-gray-300">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 