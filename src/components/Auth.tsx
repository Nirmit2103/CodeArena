import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, User, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  onSuccess?: () => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    leetcode: '',
    codeforces: '',
    hackerrank: ''
  });

  const validateForm = () => {
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (isSignUp && !formData.username) {
      setError('Username is required');
      return false;
    }
    return true;
  };

  const updateProfile = async (userId: string) => {
    try {
      // First, try to create the profile (in case trigger didn't work)
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username: formData.username,
          total_solved: 0,
          rank: 0
        });

      // If insert fails because profile exists, update it instead
      if (insertError && insertError.code === '23505') {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            username: formData.username,
            updated_at: new Date().toISOString()
          })
          .eq('id', userId);

        if (updateError) throw updateError;
      } else if (insertError) {
        throw insertError;
      }

      // Create platform stats using RPC function (bypasses RLS)
      const platforms = [
        { name: 'leetcode', username: formData.leetcode },
        { name: 'codeforces', username: formData.codeforces },
        { name: 'hackerrank', username: formData.hackerrank }
      ];

      for (const platform of platforms) {
        if (platform.username) {
          const { error: platformError } = await supabase.rpc('add_platform_stats', {
            p_user_id: userId,
            p_platform: platform.name,
            p_username: platform.username
          });

          if (platformError) throw platformError;
        }
      }

      // Create initial performance history using RPC function (bypasses RLS)
      const { error: historyError } = await supabase.rpc('add_performance_history', {
        p_user_id: userId
      });

      if (historyError) throw historyError;

    } catch (err: any) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isSignUp) {
        // First check if username is already taken
        const { data: existingUser, error: checkError } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', formData.username)
          .single();

        if (checkError && checkError.code !== 'PGRST116') throw checkError;
        if (existingUser) {
          throw new Error('Username is already taken');
        }

        // Sign up the user
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          await updateProfile(authData.user.id);
        }

      } else {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (signInError) throw signInError;

        // Verify profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', signInData.user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it with update
          await updateProfile(signInData.user.id);
        } else if (profileError) {
          throw profileError;
        }
      }

      onSuccess?.();
      navigate('/');
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.message.includes('weak_password')) {
        setError('Password must be at least 6 characters long');
      } else if (err.message.includes('invalid_credentials')) {
        setError('Invalid email or password');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700">Coding Platform Usernames (Optional)</h3>
                  
                  <div>
                    <label htmlFor="leetcode" className="block text-sm text-gray-700">LeetCode Username</label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Code2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="leetcode"
                        name="leetcode"
                        type="text"
                        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="LeetCode username"
                        value={formData.leetcode}
                        onChange={(e) => setFormData({ ...formData, leetcode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="codeforces" className="block text-sm text-gray-700">CodeForces Username</label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Code2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="codeforces"
                        name="codeforces"
                        type="text"
                        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="CodeForces username"
                        value={formData.codeforces}
                        onChange={(e) => setFormData({ ...formData, codeforces: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="hackerrank" className="block text-sm text-gray-700">HackerRank Username</label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Code2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="hackerrank"
                        name="hackerrank"
                        type="text"
                        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="HackerRank username"
                        value={formData.hackerrank}
                        onChange={(e) => setFormData({ ...formData, hackerrank: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign up' : 'Sign in')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setFormData({
                  email: '',
                  password: '',
                  username: '',
                  leetcode: '',
                  codeforces: '',
                  hackerrank: ''
                });
              }}
              className="text-indigo-600 hover:text-indigo-500"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}