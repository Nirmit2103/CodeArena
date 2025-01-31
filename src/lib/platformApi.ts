import axios from 'axios';

interface PlatformData {
  codeforces?: {
    handle: string;
    rating: number;
    rank: string;
    maxRating: number;
    maxRank: string;
    totalSolved: number;
    contribution: number;
  };
  hackerrank?: {
    username: string;
    challenges: any[];
    total_challenges: number;
  };
}

export { fetchCodeforcesData };
interface CodeforcesUserResponse {
  result: Array<{
    handle: string;
    rating?: number;
    rank?: string;
    maxRating?: number;
    maxRank?: string;
    contribution?: number;
    friendOfCount?: number;
  }>;
}

interface CodeforcesSubmissionsResponse {
  result: Array<{
    id: number;
    contestId?: number;
    problem: {
      contestId?: number;
      index?: string;
      name: string;
      rating?: number;
      tags?: string[];
    };
    verdict: string;
  }>;
}

interface CodeforcesResponse {
  data?: {
    result?: Array<{
      handle: string;
      rating?: number;
      rank?: string;
    }>;
  };
}

interface HackerrankResponse {
  data?: {
    models?: Array<{ name: string }>;
    total?: number;
  };
}

const CLIST_API_BASE = 'https://clist.by/api/v4';
const API_KEY = import.meta.env.VITE_CLIST_API_KEY;
const USERNAME = import.meta.env.VITE_CLIST_USERNAME;

// Common headers and params for all requests
const config = {
  headers: {
    'Authorization': `ApiKey ${USERNAME}:${API_KEY}`
  },
  params: {
    username: USERNAME
  }
};

export const fetchUserData = async (platform: string, username: string) => {
  switch (platform.toLowerCase()) {
    case 'codeforces':
      return fetchCodeforcesData(username);
    case 'hackerrank':
      return fetchHackerrankData(username);
    default:
      throw new Error('Unsupported platform');
  }
};

const fetchCodeforcesData = async (handle: string) => {
  try {
    // Fetch user info
    const userResponse = await axios.get<CodeforcesUserResponse>(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    if (!userResponse.data?.result?.[0]) {
      throw new Error('Codeforces user not found');
    }

    // Fetch user submissions
    const submissionsResponse = await axios.get<CodeforcesSubmissionsResponse>(
      `https://codeforces.com/api/user.status?handle=${handle}`
    );

    // Count unique solved problems
    const solvedProblems = new Set();
    submissionsResponse.data.result.forEach(submission => {
      if (submission.verdict === 'OK') {
        const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
        solvedProblems.add(problemKey);
      }
    });

    const userData = userResponse.data.result[0];
    return {
      handle: userData.handle,
      rating: userData.rating || 0,
      rank: userData.rank || 'unrated',
      maxRating: userData.maxRating || 0,
      maxRank: userData.maxRank || 'unrated',
      totalSolved: solvedProblems.size,
      contribution: userData.contribution || 0
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error('Invalid Codeforces handle');
    }
    throw new Error('Failed to fetch Codeforces data');
  }
};



const fetchHackerrankData = async (username: string) => {
  try {
    const response: HackerrankResponse = await axios.get(
      `https://www.hackerrank.com/rest/hackers/${username}/recent_challenges?limit=100`
    );

    if (!response.data?.models || !response.data?.total) {
      throw new Error('HackerRank data not found');
    }

    return {
      username,
      challenges: response.data.models,
      total_challenges: response.data.total
    };
  } catch (error) {
    throw new Error('Failed to fetch HackerRank data');
  }
};

// Contest Endpoints
export const fetchContests = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/contest/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching contests:', error);
    throw new Error('Failed to fetch contests');
  }
};

export const fetchContest = async (id: string) => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/contest/${id}/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching contest:', error);
    throw new Error('Failed to fetch contest');
  }
};

// Coder Endpoints
export const fetchCoderProfile = async (id: string) => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/coder/${id}/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching coder profile:', error);
    throw new Error('Failed to fetch coder profile');
  }
};

export const fetchMyProfile = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/coder/me/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching your profile:', error);
    throw new Error('Failed to fetch your profile');
  }
};

// Other Endpoints
export const fetchResources = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/resource/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    throw new Error('Failed to fetch resources');
  }
};

export const fetchProblems = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/problem/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw new Error('Failed to fetch problems');
  }
};

export const fetchStatistics = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/statistics/`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};

// Test function
export const testApiConnection = async () => {
  try {
    const response = await axios.get(`${CLIST_API_BASE}/contest/`, config);
    return response.status === 200;
  } catch (error) {
    throw new Error('API connection failed');
  }
};

// Add this function to fetch contests
export const fetchAllContests = async () => {
  try {
    // Using cors-anywhere as a proxy
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://codeforces.com/api/contest.list';
    
    const response = await axios.get(proxyUrl + targetUrl, {
      headers: {
        'Origin': 'https://codeforces.com'
      }
    });

    if (!response.data || !response.data.result) {
      throw new Error('Invalid response format');
    }

    const contests = response.data.result;
    
    return contests
      .filter((contest: any) => 
        contest.phase === 'BEFORE' || 
        contest.phase === 'CODING'
      )
      .slice(0, 10) // Limit to 10 contests to avoid overwhelming the UI
      .map((contest: any) => ({
        id: contest.id.toString(),
        title: contest.name,
        platform: 'Codeforces',
        startDate: new Date(contest.startTimeSeconds * 1000),
        endDate: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000),
        duration: contest.durationSeconds,
        url: `https://codeforces.com/contest/${contest.id}`,
        type: 'Competition',
        participantCount: 0,
        phase: contest.phase,
        description: 'Codeforces competitive programming contest'
      }));
  } catch (error) {
    console.error('Error fetching contests:', error);
    return []; // Return empty array instead of throwing
  }
}; 