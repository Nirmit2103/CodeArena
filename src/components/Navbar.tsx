import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (path: string) => {
    setShowProfileMenu(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-indigo-500/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search challenges, projects, users..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-indigo-500/10 rounded-lg 
                         text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                         focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-200 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800/50"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 
                            flex items-center justify-center text-indigo-400">
                  <User size={18} />
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-[#0A0A0B] rounded-lg shadow-xl 
                             border border-indigo-500/10 backdrop-blur-xl">
                  <button 
                    onClick={() => handleProfileClick('/profile')}
                    className="flex items-center gap-2 w-full px-4 py-2 text-gray-400 
                             hover:text-gray-200 hover:bg-gray-800/50"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => handleProfileClick('/settings')}
                    className="flex items-center gap-2 w-full px-4 py-2 text-gray-400 
                             hover:text-gray-200 hover:bg-gray-800/50"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-gray-800 my-1"></div>
                  <button
                    onClick={() => {/* Handle logout */}}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-400 
                             hover:text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;