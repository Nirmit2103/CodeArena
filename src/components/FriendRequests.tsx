import React, { useState, useEffect } from 'react';
import { UserPlus, Check, X, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export default function FriendRequests() {
  const { user } = useAuthStore();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadFriendRequests();
    }
  }, [user]);

  const loadFriendRequests = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('friend_requests')
      .select(`
        *,
        from_profile:profiles!friend_requests_from_user_fkey(username),
        to_profile:profiles!friend_requests_to_user_fkey(username)
      `)
      .or(`from_user.eq.${user.id},to_user.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading friend requests:', error);
      return;
    }

    setRequests(data || []);
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !user) return;

    setLoading(true);
    setError(null);

    try {
      // Get the target user's ID
      const { data: targetUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      if (!targetUser) {
        throw new Error('User not found');
      }

      // Check if request already exists
      const { data: existingRequest } = await supabase
        .from('friend_requests')
        .select('*')
        .or(`and(from_user.eq.${user.id},to_user.eq.${targetUser.id}),and(from_user.eq.${targetUser.id},to_user.eq.${user.id})`)
        .single();

      if (existingRequest) {
        throw new Error('Friend request already exists');
      }

      // Send friend request
      const { error: requestError } = await supabase
        .from('friend_requests')
        .insert({
          from_user: user.id,
          to_user: targetUser.id,
          status: 'pending'
        });

      if (requestError) throw requestError;

      setUsername('');
      await loadFriendRequests();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId: string, action: 'accept' | 'reject') => {
    if (!user) return;

    try {
      if (action === 'accept') {
        const { error } = await supabase
          .from('friend_requests')
          .update({ status: 'accepted' })
          .eq('id', requestId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('friend_requests')
          .update({ status: 'rejected' })
          .eq('id', requestId);

        if (error) throw error;
      }

      await loadFriendRequests();
    } catch (err: any) {
      console.error('Error handling friend request:', err);
    }
  };

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold">Friend Requests</h3>
        <div className="flex items-center gap-2">
          <Users size={20} className="text-indigo-600" />
          <span className="text-sm text-gray-600">{requests.length} requests</span>
        </div>
      </div>
      
      <form onSubmit={handleSendRequest} className="space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
        
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="input-field flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            <UserPlus size={20} />
            Add Friend
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">
                {request.from_user === user?.id
                  ? `Sent to ${request.to_profile.username}`
                  : `From ${request.from_profile.username}`}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(request.created_at).toLocaleDateString()}
              </p>
            </div>
            
            {request.status === 'pending' && request.to_user === user?.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleRequest(request.id, 'accept')}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => handleRequest(request.id, 'reject')}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            
            {request.status !== 'pending' && (
              <span className={`text-sm ${
                request.status === 'accepted' ? 'text-green-600' : 'text-red-600'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}