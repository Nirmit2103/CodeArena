import { supabase } from './supabase';
import { fetchCodeForcesStats, fetchHackerRankStats, fetchLeetCodeStats } from './competeApi';
import type { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type PlatformStats = Database['public']['Tables']['platform_stats']['Row'];
type PerformanceHistory = Database['public']['Tables']['performance_history']['Row'];

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      platform_stats (*),
      performance_history (*)
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
}

export async function updatePlatformUsername(
  userId: string,
  platform: string,
  username: string
) {
  const { error } = await supabase
    .from('platform_stats')
    .upsert({
      user_id: userId,
      platform,
      username,
      solved_count: 0,
      last_sync: new Date().toISOString()
    }, {
      onConflict: 'user_id,platform'
    })
    .select()
    .single();

  if (error) throw error;
}

export async function syncPlatformStats(userId: string) {
  try {
    const { data: platformStats } = await supabase
      .from('platform_stats')
      .select('platform, username')
      .eq('user_id', userId);

    let totalSolved = 0;
    const updates = [];

    for (const stat of platformStats || []) {
      if (!stat.username) continue;

      try {
        let platformData;
        switch (stat.platform) {
          case 'leetcode':
            platformData = await fetchLeetCodeStats(stat.username);
            break;
          case 'codeforces':
            platformData = await fetchCodeForcesStats(stat.username);
            break;
          case 'hackerrank':
            platformData = await fetchHackerRankStats(stat.username);
            break;
          default:
            continue;
        }

        const update = {
          user_id: userId,
          platform: stat.platform,
          username: stat.username,
          solved_count: platformData.totalSolved || 0,
          rank: platformData.rank || null,
          rating: platformData.rating || null,
          contests_participated: platformData.contests || 0,
          last_sync: new Date().toISOString()
        };

        updates.push(update);
        totalSolved += update.solved_count;
      } catch (error) {
        console.error(`Error syncing ${stat.platform} stats:`, error);
      }
    }

    // Update platform stats
    if (updates.length > 0) {
      const { error: updateError } = await supabase
        .from('platform_stats')
        .upsert(updates, {
          onConflict: 'user_id,platform'
        })
        .select();

      if (updateError) throw updateError;
    }

    // Update total solved in profile
    await supabase
      .from('profiles')
      .update({ total_solved: totalSolved })
      .eq('id', userId)
      .select()
      .single();

    // Add performance history entry
    await supabase
      .from('performance_history')
      .insert({
        user_id: userId,
        date: new Date().toISOString().split('T')[0],
        solved_count: totalSolved
      })
      .select()
      .single();

  } catch (error) {
    console.error('Error syncing platform stats:', error);
    throw error;
  }
}

const KONTESTS_API_BASE = 'https://kontests.net/api/v1';

export async function fetchAllContests(): Promise<Tournament[]> {
  try {
    const response = await fetch('https://kontests.net/api/v1/all');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.map((contest: any) => ({
      id: contest.name + contest.start_time, // Create unique ID
      title: contest.name,
      platform: contest.site,
      startDate: new Date(contest.start_time),
      endDate: new Date(contest.end_time),
      registrationDeadline: new Date(contest.start_time), // Adjust if needed
      url: contest.url,
      type: determineContestType(contest),
      participantCount: 0, // API doesn't provide this
      description: `${contest.name} hosted by ${contest.site}`,
      duration: contest.duration,
      status: contest.status,
      inTwentyFourHours: contest.in_24_hours === 'Yes'
    }));
  } catch (error) {
    console.error('Error fetching contests:', error);
    throw error; // Rethrow the error to be handled in the component
  }
}

function determineContestType(contest: any): 'Competition' | 'Hackathon' {
  const title = contest.name.toLowerCase();
  return title.includes('hackathon') ? 'Hackathon' : 'Competition';
}

export async function savePlatformData(userId: string, data: PlatformData) {
  // Implementation to save data to your backend
}