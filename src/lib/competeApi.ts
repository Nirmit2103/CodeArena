import axios from 'axios';

const API_BASE_URL = 'https://competeapi.onrender.com/api';

export interface PlatformResponse {
  username: string;
  totalSolved?: number;
  rating?: number;
  rank?: number | string;
  contests?: number;
  maxRating?: number;
  maxRank?: string;
}

// Add LeetCode API integration
const LEETCODE_API = 'https://alfa-leetcode-api.onrender.com';

export async function fetchCodeForcesStats(username: string): Promise<PlatformResponse> {
  try {
    // Fetch user info
    const userResponse = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );

    if (!userResponse.data?.result?.[0]) {
      throw new Error('Codeforces user not found');
    }

    // Fetch user submissions
    const submissionsResponse = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`
    );

    // Count unique solved problems
    const solvedProblems = new Set();
    submissionsResponse.data.result.forEach((submission: any) => {
      if (submission.verdict === 'OK') {
        const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedProblems.add(problemKey);
      }
    });

    const userData = userResponse.data.result[0];

    // Get contest count
    const contestsResponse = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${username}`
    );

    return {
      username,
      totalSolved: solvedProblems.size,
      rating: userData.rating || 0,
      rank: userData.rank || 'unrated',
      contests: contestsResponse.data.result.length,
      maxRating: userData.maxRating || 0,
      maxRank: userData.maxRank || 'unrated'
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error('Invalid Codeforces handle');
    }
    console.error('Error fetching CodeForces stats:', error);
    throw new Error('Failed to fetch CodeForces stats');
  }
}

export async function fetchHackerRankStats(username: string): Promise<PlatformResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/hackerrank/${username}`);
    return {
      username,
      totalSolved: response.data.totalSolved,
      rating: response.data.score
    };
  } catch (error) {
    console.error('Error fetching HackerRank stats:', error);
    throw new Error('Failed to fetch HackerRank stats');
  }
}

export async function fetchLeetCodeStats(username: string): Promise<PlatformResponse> {
  try {
    // Check rate limit status first
    const rateLimitStatus = await checkRateLimit();
    if (rateLimitStatus.remaining <= 1) {
      throw new Error(`API rate limit exceeded. Resets at ${new Date(rateLimitStatus.resetTime)}`);
    }

    // Fetch full profile
    const profileResponse = await axios.get(`${LEETCODE_API}/${username}`);
    const solvedResponse = await axios.get(`${LEETCODE_API}/${username}/solved`);
    const contestResponse = await axios.get(`${LEETCODE_API}/${username}/contest`);

    return {
      username,
      totalSolved: solvedResponse.data.solvedProblem || 0,
      rating: contestResponse.data.rating || 0,
      rank: contestResponse.data.ranking || 'unrated',
      contests: contestResponse.data.contestParticipation || 0
    };
  } catch (error) {
    handleLeetCodeError(error);
    throw new Error('Failed to fetch LeetCode stats');
  }
}

// Rate limit checker
let rateLimit = {
  remaining: 10,
  resetTime: Date.now() + 60000 // Default 1 minute
};

async function checkRateLimit() {
  if (rateLimit.remaining > 0) return rateLimit;
  
  const timeUntilReset = rateLimit.resetTime - Date.now();
  if (timeUntilReset > 0) {
    await new Promise(resolve => setTimeout(resolve, timeUntilReset));
  }
  
  // Reset counter
  rateLimit = {
    remaining: 10,
    resetTime: Date.now() + 60000
  };
  
  return rateLimit;
}

function handleLeetCodeError(error: any) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 429) {
      const resetTime = error.response.headers['x-ratelimit-reset'];
      rateLimit.resetTime = parseInt(resetTime) * 1000;
      rateLimit.remaining = 0;
    }
  }
}