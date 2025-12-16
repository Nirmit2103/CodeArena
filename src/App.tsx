import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Code2, Trophy, Users as UsersIcon, MessageSquare, Heart, Plus } from 'lucide-react';
import Navbar from './components/Navbar';
import Lounge from './components/Lounge';
import Profile from './components/Profile';
import ProfileCard from './components/ProfileCard';
import PerformanceGraph from './components/PerformanceGraph';
import FriendRequests from './components/FriendRequests';
import Auth from './components/Auth';
import { useUserStore } from './store/userStore';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import Tournaments from './components/Tournaments';
import { ErrorBoundary } from './components/ErrorBoundary';
import ProjectForm from './components/ProjectForm';
import { PROJECT_CATEGORIES } from './constants/projectCategories';
import Leaderboard from './components/Leaderboard';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Projects from './components/Projects';
import { Navbar as CustomNavbar } from './components/Navbar';
import Settings from './components/Settings';
import FindTeammates from './components/FindTeammates';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function App() {
  const { currentUser, friends } = useUserStore();
  const { setUser, user } = useAuthStore();
  const allUsers = currentUser ? [currentUser, ...friends] : friends;
  const [showProjectForm, setShowProjectForm] = useState(false);
  const projectCategories = ['All', ...PROJECT_CATEGORIES];
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'AI Code Reviewer',
      description: 'An intelligent system that reviews pull requests and suggests improvements using machine learning.',
      categories: ['AI/ML', 'DevOps', 'Open Source'],
      teamSize: 5,
      currentMembers: 3
    },
    {
      id: '2',
      name: 'CodeCollab IDE',
      description: 'Real-time collaborative code editor with built-in video conferencing and pair programming features.',
      categories: ['Web Development', 'Education'],
      teamSize: 4,
      currentMembers: 2
    },
    {
      id: '3',
      name: 'Blockchain Auth System',
      description: 'Decentralized authentication protocol using blockchain technology for enhanced security.',
      categories: ['Blockchain', 'Cybersecurity'],
      teamSize: 3,
      currentMembers: 1
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={
          <div className="flex min-h-screen bg-[#0A0A0B]">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64 p-6 min-h-screen">
              <Navbar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                  <Routes>
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
                    <Route path="/tournaments" element={<PrivateRoute><Tournaments /></PrivateRoute>} />
                    <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
                    <Route path="/lounge" element={<PrivateRoute><Lounge /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                    <Route path="/teammates" element={
                      <div className="ml-64">
                        <Navbar />
                        <FindTeammates />
                      </div>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;