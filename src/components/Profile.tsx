import React, { useEffect, useState } from 'react';
import { Code2, Trophy, Edit2, User, RefreshCw, Code, ExternalLink, Github, Calendar, Star, GitBranch, Clock, Activity, Users, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { getProfile, updatePlatformUsername, syncPlatformStats } from '../lib/api';
import {
  fetchUserData,
  fetchMyProfile,
  fetchContests,
  fetchProblems,
  fetchStatistics,
  fetchCodeforcesData
} from '../lib/platformApi';
import axios from 'axios';
import LeetCodeStats from './LeetCodeStats';
import { Platform } from '../lib/api';
import HackerRankStats from './HackerRankStats';

export interface PlatformStats {
  username: string;
  solved: number;
  rank: string;
  lastSynced: Date;
}

export interface UserProfile {
  username: string;
  joinDate: Date;
  platformStats: {
    codeforces?: PlatformStats;
    hackerrank?: PlatformStats;
    leetcode?: PlatformStats;
  };
}

interface PlatformData {
  codeforces?: any;
  hackerrank?: any;
  leetcode?: any;
}

export default function Profile() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>({
    username: '',
    rank: 'unrated',
    total_solved: 0,
    platform_stats: [],
    codeforces: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    codeforces: '',
    hackerrank: ''
  });
  const [platform, setPlatform] = useState('codeforces');
  const [username, setUsername] = useState('');
  const [importedData, setImportedData] = useState<PlatformData | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [contests, setContests] = useState<any[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const fetchCodeForcesStats = async (username: string) => {
    try {
      const data = await fetchCodeforcesData(username);
      return {
        handle: data.handle,
        rating: data.rating || 0,
        maxRating: data.maxRating || 0,
        rank: data.rank || 'unrated',
        maxRank: data.maxRank || 'unrated',
        contribution: data.contribution || 0,
        totalSolved: data.totalSolved || 0,
        lastOnlineTime: data.lastOnlineTimeSeconds ? new Date(data.lastOnlineTimeSeconds * 1000) : null
      };
    } catch (error) {
      console.error('Error fetching Codeforces stats:', error);
      throw error;
    }
  };

  const loadProfile = async () => {
    if (!user) return;
    try {
      const data = await getProfile(user.id);

      const platformUsernames = {
        codeforces: '',
        hackerrank: ''
      };

      data.platform_stats?.forEach((stat: any) => {
        if (stat.platform in platformUsernames) {
          platformUsernames[stat.platform as keyof typeof platformUsernames] = stat.username || '';
        }
      });

      // If we have a Codeforces username, fetch the latest data
      const codeforcesStats = data.platform_stats?.find((stat: any) => stat.platform === 'codeforces');
      if (codeforcesStats?.username) {
        try {
          const codeforcesData = await fetchCodeForcesStats(codeforcesStats.username);
          data.codeforces = codeforcesData;
          data.total_solved = codeforcesData.totalSolved;
          data.rank = codeforcesData.rank;
        } catch (err) {
          console.error('Error fetching Codeforces data:', err);
        }
      }

      setProfile(data);
      setFormData(platformUsernames);
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const platforms = ['codeforces', 'hackerrank'] as const;
      
      for (const platform of platforms) {
        if (formData[platform]) {
          await updatePlatformUsername(user.id, platform, formData[platform]);
        }
      }

      setIsEditing(false);
      await loadProfile();
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message);
    }
  };

  const handleSync = async () => {
    if (!user) return;
    setIsSyncing(true);
    setError(null);
    try {
      // Get Codeforces username from platform stats
      const codeforcesStats = profile.platform_stats?.find((stat: any) => stat.platform === 'codeforces');
      if (!codeforcesStats?.username) {
        throw new Error('Please add your Codeforces username first');
      }

      // Fetch Codeforces data
      const codeforcesData = await fetchCodeforcesData(codeforcesStats.username);

      // Update profile with Codeforces data
      const updatedProfile = {
        ...profile,
        codeforces: {
          handle: codeforcesData.handle,
          rating: codeforcesData.rating,
          rank: codeforcesData.rank,
          maxRating: codeforcesData.maxRating,
          maxRank: codeforcesData.maxRank,
          totalSolved: codeforcesData.totalSolved,
          contribution: codeforcesData.contribution
        },
        total_solved: codeforcesData.totalSolved,
        rank: codeforcesData.rank
      };

      setProfile(updatedProfile);

      // Sync with backend
      await syncPlatformStats(user.id);
      await loadProfile();
    } catch (err: any) {
      setError(err.message);
      console.error('Error syncing profile:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImport = async () => {
    if (!username) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchUserData(platform, username);
      setImportedData(data);
      
      // Here you would typically send the data to your backend
      console.log('Imported data:', data);
      
    } catch (err: any) {
      setError(err.message || 'Failed to import data');
    } finally {
      setLoading(false);
    }
  };

  const loadProfileData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch all required data in parallel
      const [profile, contestsData, problemsData, statsData] = await Promise.all([
        fetchMyProfile(),
        fetchContests(),
        fetchProblems(),
        fetchStatistics()
      ]);

      setProfileData(profile);
      setContests(contestsData.objects || []);
      setProblems(problemsData.objects || []);
      setStatistics(statsData);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load profile data');
      console.error('Error loading profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformStats = (platform: string) => {
    return profile.platform_stats?.find((stat: any) => stat.platform === platform);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={loadProfileData}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <User size={48} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profile.username}</h1>
            <div className="flex items-center gap-4 mt-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 size={16} />
                <span>{profile.total_solved} total problems solved</span>
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg transition-colors"
        >
          Edit Profile
        </button>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Codeforces Card */}
        {getPlatformStats('codeforces') && (
          <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src="/codeforces-logo.svg" className="w-8 h-8" alt="Codeforces" />
              <h3 className="text-lg font-semibold">Codeforces</h3>
            </div>
            <div className="space-y-3">
              <StatItem label="Handle" value={getPlatformStats('codeforces')?.username} />
              <StatItem label="Rating" value={profile.codeforces?.rating || 'Unrated'} />
              <StatItem label="Rank" value={profile.codeforces?.rank} />
              <StatItem label="Problems Solved" value={profile.codeforces?.totalSolved} />
              <StatItem label="Contribution" value={profile.codeforces?.contribution} />
            </div>
          </div>
        )}

        {/* LeetCode Card */}
        {profile.platform_stats?.leetcode && (
          <LeetCodeStats data={getPlatformStats('leetcode')} />
        )}

        {/* HackerRank Card */}
        {getPlatformStats('hackerrank') && (
          <HackerRankStats data={getPlatformStats('hackerrank')} />
        )}
      </div>

      {/* Unified Achievements Section */}
      <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
        <h2 className="text-2xl font-bold mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0A0A0B] rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Platform Progress</h3>
            <div className="space-y-4">
              {profile.platform_stats?.map((platform: any) => (
                <div key={platform.platform} className="flex items-center justify-between">
                  <span className="capitalize">{platform.platform}</span>
                  <span className="text-indigo-400">
                    {platform.solved || 0} problems solved
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-[#0A0A0B] rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
            {profile.recent_activity?.length > 0 ? (
              <div className="space-y-3">
                {profile.recent_activity.map((activity: any) => (
                  <div key={activity.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{activity.description}</span>
                    <span className="text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-4">
                No recent activity found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Platform Links */}
      <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
        <h2 className="text-2xl font-bold mb-4">Platform Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.platform_stats?.map((platform: any) => (
            <a
              key={platform.platform}
              href={getPlatformProfileLink(platform.platform, platform.username)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#0A0A0B] hover:bg-[#141416] rounded-lg transition-colors flex items-center gap-3"
            >
              <img 
                src={`/${platform.platform}-logo.svg`} 
                className="w-6 h-6" 
                alt={platform.platform} 
              />
              <span className="font-medium">{platform.username}</span>
              <ExternalLink size={16} className="ml-auto text-gray-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const getPlatformProfileLink = (platform: string, username: string) => {
  const platforms: { [key: string]: string } = {
    codeforces: `https://codeforces.com/profile/${username}`,
    leetcode: `https://leetcode.com/${username}`,
    hackerrank: `https://hackerrank.com/${username}`
  };
  return platforms[platform] || '#';
};