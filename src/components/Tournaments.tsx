import React, { useState, useEffect } from 'react';
import { Calendar, Globe, Clock, Users, ExternalLink, Trophy, Search, Filter, Zap } from 'lucide-react';
import { fetchAllContests } from '../lib/platformApi';

interface Tournament {
  id: string;
  title: string;
  platform: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  url: string;
  type: 'Competition' | 'Hackathon';
  participantCount: number;
  description: string;
  duration: string;
  status: string;
  inTwentyFourHours: boolean;
  phase: string;
  difficulty: string;
}

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: '1',
      title: 'Global Coding Challenge',
      platform: 'Codeforces',
      startDate: new Date('2024-03-20'),
      endDate: new Date('2024-03-21'),
      registrationDeadline: new Date('2024-03-19'),
      url: '#',
      type: 'Competition',
      participantCount: 1500,
      description: 'Annual programming competition with algorithmic challenges',
      duration: '2 hours',
      status: 'upcoming',
      inTwentyFourHours: true,
      phase: 'Registration Open',
      difficulty: 'Hard'
    },
    {
      id: '2',
      title: 'AI Hackathon 2024',
      platform: 'HackerRank',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-03'),
      registrationDeadline: new Date('2024-03-30'),
      url: '#',
      type: 'Hackathon',
      participantCount: 850,
      description: 'Build innovative AI solutions for real-world problems',
      duration: '48 hours',
      status: 'upcoming',
      inTwentyFourHours: false,
      phase: 'Preparation',
      difficulty: 'Medium'
    },
    {
      id: '3',
      title: 'Weekly Contest #345',
      platform: 'LeetCode',
      startDate: new Date('2024-03-18'),
      endDate: new Date('2024-03-18'),
      registrationDeadline: new Date('2024-03-18'),
      url: '#',
      type: 'Competition',
      participantCount: 4500,
      description: 'Weekly algorithmic coding contest',
      duration: '1.5 hours',
      status: 'ongoing',
      inTwentyFourHours: false,
      phase: 'Coding Phase',
      difficulty: 'Medium'
    },
    {
      id: '4',
      title: 'Google Code Jam 2024',
      platform: 'Google',
      startDate: new Date('2024-04-05T00:00:00'),
      endDate: new Date('2024-04-07T23:59:59'),
      registrationDeadline: new Date('2024-04-04T23:59:59'),
      url: 'https://codingcompetitions.withgoogle.com/codejam',
      type: 'Competition',
      participantCount: 25000,
      description: 'Annual programming competition hosted by Google',
      duration: '3 days',
      status: 'upcoming',
      inTwentyFourHours: false,
      phase: 'Qualification Round',
      difficulty: 'Hard'
    },
    {
      id: '5',
      title: 'CodeChef March Challenge',
      platform: 'CodeChef',
      startDate: new Date('2024-03-15T15:00:00'),
      endDate: new Date('2024-03-25T15:00:00'),
      registrationDeadline: new Date('2024-03-25T14:00:00'),
      url: 'https://codechef.com/march-challenge',
      type: 'Competition',
      participantCount: 12000,
      description: '10-day long challenge with varying difficulty problems',
      duration: '10 days',
      status: 'ongoing',
      inTwentyFourHours: false,
      phase: 'Challenge Phase',
      difficulty: 'Medium'
    },
    {
      id: '6',
      title: 'Meta Hacker Cup 2024',
      platform: 'Meta',
      startDate: new Date('2024-05-01T00:00:00'),
      endDate: new Date('2024-05-31T23:59:59'),
      registrationDeadline: new Date('2024-04-30T23:59:59'),
      url: 'https://www.facebook.com/codingcompetitions/hacker-cup',
      type: 'Competition',
      participantCount: 18000,
      description: 'Annual open programming competition by Meta',
      duration: '1 month',
      status: 'upcoming',
      inTwentyFourHours: false,
      phase: 'Registration Open',
      difficulty: 'Hard'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        // Temporary mock until API is ready
        const mockData = [...tournaments]; // Use initial placeholder data
        setTournaments(mockData);
      } catch (error) {
        console.error('Error loading tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tournaments</h1>
          <p className="text-gray-400 mt-1">Compete with the best developers worldwide</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F0F13] border border-indigo-500/10 rounded-lg 
                       text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {['all', 'upcoming', 'ongoing', 'completed'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors
                ${filter === filterOption 
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#0F0F13] border border-transparent'}`}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="group bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6 
                                          hover:border-indigo-500/30 transition-all">
            {/* Tournament Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Trophy size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {tournament.title}
                  </h3>
                  <span className="text-sm text-gray-500">{tournament.platform}</span>
                </div>
              </div>
              {tournament.inTwentyFourHours && (
                <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded-full text-xs">
                  Starts Soon
                </span>
              )}
            </div>

            {/* Tournament Info */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {tournament.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={16} />
                <span>Starts: {new Date(tournament.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={16} />
                <span>Duration: {tournament.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users size={16} />
                <span>{tournament.participantCount} Participants</span>
              </div>
            </div>

            {/* Register Button */}
            <a
              href={tournament.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-500 
                     hover:bg-indigo-600 text-white rounded-lg transition-colors"
            >
              Register Now
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Zap size={24} className="text-indigo-400 animate-pulse" />
          <span className="ml-2 text-gray-400">Loading tournaments...</span>
        </div>
      )}
    </div>
  );
};

export default Tournaments; 