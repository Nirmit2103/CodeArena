import { create } from 'zustand';
import { Profile } from '../types';

interface UserState {
  currentUser: Profile | null;
  friends: Profile[];
  pendingRequests: Profile[];
  setCurrentUser: (user: Profile) => void;
  addFriend: (friend: Profile) => void;
  sendFriendRequest: (username: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: {
    id: '1',
    username: 'currentUser',
    platforms: {
      leetcode: 'leetcode_user',
      codeforces: 'cf_user',
      hackerrank: 'hr_user'
    },
    totalSolved: 450,
    rank: 3,
    friends: [],
    pendingRequests: [],
    sentRequests: [],
    performanceHistory: [
      { date: '2024-01', solved: 30 },
      { date: '2024-02', solved: 45 },
      { date: '2024-03', solved: 60 }
    ]
  },
  friends: [
    {
      id: '2',
      username: 'codeMaster',
      platforms: {
        leetcode: 'codemaster123',
        codeforces: 'master_coder'
      },
      totalSolved: 523,
      rank: 1,
      friends: [],
      pendingRequests: [],
      sentRequests: [],
      performanceHistory: [
        { date: '2024-01', solved: 40 },
        { date: '2024-02', solved: 55 },
        { date: '2024-03', solved: 70 }
      ]
    },
    {
      id: '3',
      username: 'algorithmPro',
      platforms: {
        leetcode: 'algopro',
        codeforces: 'proalgo'
      },
      totalSolved: 487,
      rank: 2,
      friends: [],
      pendingRequests: [],
      sentRequests: [],
      performanceHistory: [
        { date: '2024-01', solved: 35 },
        { date: '2024-02', solved: 50 },
        { date: '2024-03', solved: 65 }
      ]
    }
  ],
  pendingRequests: [],
  setCurrentUser: (user) => set({ currentUser: user }),
  addFriend: (friend) => set((state) => ({
    friends: [...state.friends, friend]
  })),
  sendFriendRequest: async (username) => {
    // TODO: Implement API call to send friend request
    console.log('Sending friend request to:', username);
  },
  acceptFriendRequest: async (requestId) => {
    // TODO: Implement API call to accept friend request
    console.log('Accepting friend request:', requestId);
  }
}));