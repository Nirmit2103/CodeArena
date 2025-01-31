import React, { useState, useEffect } from 'react';
import { Bell, Moon, Sun, Globe, Lock, Eye, EyeOff, Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark',
    notifications: {
      tournaments: true,
      messages: true,
      updates: false
    },
    privacy: {
      profileVisibility: 'public',
      showActivity: true,
      showStats: true
    },
    language: 'en'
  });

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [settings.theme]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' }
  ];

  const handleThemeChange = (theme: string) => {
    setSettings(prev => ({
      ...prev,
      theme: theme
    }));
  };

  return (
    <div className="max-w-4xl space-y-6 dark:bg-[#0F0F13] bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold dark:text-white text-gray-900">Settings</h1>

      {/* Appearance */}
      <div className="dark:bg-[#0F0F13] bg-white rounded-lg border dark:border-indigo-500/10 border-gray-200 p-6">
        <h2 className="text-lg font-medium dark:text-white text-gray-900 mb-4">Appearance</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${settings.theme === 'light' 
                ? 'bg-indigo-500/20 text-indigo-400' 
                : 'dark:text-gray-400 text-gray-600 hover:dark:text-gray-200 hover:text-gray-900 dark:hover:bg-gray-800/50 hover:bg-gray-100'}`}
          >
            <Sun size={20} />
            Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${settings.theme === 'dark' 
                ? 'bg-indigo-500/20 text-indigo-400' 
                : 'dark:text-gray-400 text-gray-600 hover:dark:text-gray-200 hover:text-gray-900 dark:hover:bg-gray-800/50 hover:bg-gray-100'}`}
          >
            <Moon size={20} />
            Dark
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="dark:bg-[#0F0F13] bg-white rounded-lg border dark:border-indigo-500/10 border-gray-200 p-6">
        <h2 className="text-lg font-medium dark:text-white text-gray-900 mb-4">Notifications</h2>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-400" />
                <span className="text-gray-200 capitalize">{key}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      [key]: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                             peer-checked:after:translate-x-full peer-checked:after:border-white 
                             after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                             after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                             peer-checked:bg-indigo-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="dark:bg-[#0F0F13] bg-white rounded-lg border dark:border-indigo-500/10 border-gray-200 p-6">
        <h2 className="text-lg font-medium dark:text-white text-gray-900 mb-4">Privacy</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-gray-400" />
              <span className="text-gray-200">Profile Visibility</span>
            </div>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => setSettings({
                ...settings,
                privacy: {
                  ...settings.privacy,
                  profileVisibility: e.target.value
                }
              })}
              className="px-3 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                       text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye size={20} className="text-gray-400" />
              <span className="text-gray-200">Show Activity</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.showActivity}
                onChange={(e) => setSettings({
                  ...settings,
                  privacy: {
                    ...settings.privacy,
                    showActivity: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                           peer-checked:after:translate-x-full peer-checked:after:border-white 
                           after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                           after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                           peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="dark:bg-[#0F0F13] bg-white rounded-lg border dark:border-indigo-500/10 border-gray-200 p-6">
        <h2 className="text-lg font-medium dark:text-white text-gray-900 mb-4">Language</h2>
        <div className="flex items-center gap-3">
          <Globe size={20} className="text-gray-400" />
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="px-3 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                     text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 
                        text-white rounded-lg transition-colors">
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings; 