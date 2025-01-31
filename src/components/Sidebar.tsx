import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Users, MessageSquare, Code2, Zap, Users as TeamIcon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#0A0A0B] border-r border-indigo-500/10">
      <div className="flex flex-col h-full p-6">
        {/* Logo Area */}
        <div className="mb-12">
          <div className="flex items-center gap-2">
            <Zap size={24} className="text-indigo-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              CodeArena
            </h1>
          </div>
          <p className="mt-2 text-xs text-gray-500">Where Code Battles Begin</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive('/') 
                ? 'bg-indigo-500/10 text-indigo-400' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>

          <Link 
            to="/projects" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive('/projects') 
                ? 'bg-indigo-500/10 text-indigo-400' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}
          >
            <Code2 size={20} />
            <span>Projects</span>
          </Link>

          <Link 
            to="/tournaments" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive('/tournaments') 
                ? 'bg-indigo-500/10 text-indigo-400' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}
          >
            <Trophy size={20} />
            <span>Tournaments</span>
          </Link>

          <Link 
            to="/leaderboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive('/leaderboard') 
                ? 'bg-indigo-500/10 text-indigo-400' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}
          >
            <Users size={20} />
            <span>Leaderboard</span>
          </Link>

          <Link 
            to="/lounge" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive('/lounge') 
                ? 'bg-indigo-500/10 text-indigo-400' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}
          >
            <MessageSquare size={20} />
            <span>Lounge</span>
          </Link>

          <Link 
            to="/teammates" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
              ${isActive('/teammates') 
                ? 'bg-indigo-500/10 text-indigo-400' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}`}
          >
            <TeamIcon size={20} />
            <span>Find Teammates</span>
          </Link>
        </nav>

        {/* Version Tag */}
        <div className="mt-auto pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-600">Beta v0.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 