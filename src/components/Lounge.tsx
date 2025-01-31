import React, { useState } from 'react';
import { Users, Plus, MessageSquare, Hash, Volume2, Play, Pause, Search, Music, SkipForward, SkipBack } from 'lucide-react';
import { Room } from '../types';

const Lounge = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: 'Lofi Coding Mix',
    artist: 'CodeBeats',
  });
  const [songList, setSongList] = useState([
    { title: 'Lofi Coding Mix', artist: 'CodeBeats' },
    { title: 'Chill Vibes', artist: 'DJ Chill' },
    { title: 'Coding Beats', artist: 'Beats Studio' },
  ]);
  const [filteredSongs, setFilteredSongs] = useState(songList);
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Algorithm Masters',
      description: 'Discussion about advanced algorithms and problem-solving strategies',
      members: 24,
      currentSong: {
        title: 'Lofi Coding Mix',
        artist: 'CodeBeats'
      },
      isPlaying: true,
      tags: ['algorithms', 'competitive', 'learning']
    },
    // Add more rooms...
  ]);

  const playMusic = () => {
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    setIsPlaying(false);
  };

  const skipMusic = () => {
    // Implement skip functionality
    const currentIndex = songList.findIndex(song => song.title === currentSong.title);
    const nextIndex = (currentIndex + 1) % songList.length;
    setCurrentSong(songList[nextIndex]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = songList.filter(song =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Code Lounge</h1>
          <p className="text-gray-400 mt-1">Join rooms, chat, and code together</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600
                        text-white rounded-lg transition-colors">
          <Plus size={20} />
          Create Room
        </button>
      </div>

      {/* Music Player - Only shown when room is joined */}
      {joinedRoom && (
        <div className="bg-[#0A0A0B] rounded-lg p-4">
          <h2 className="text-lg font-bold text-white mb-2">Music Player</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Music size={24} className="text-indigo-400" />
              <div>
                <p className="text-white">{currentSong.title}</p>
                <p className="text-gray-500">{currentSong.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => {}} className="p-2 text-indigo-400 hover:text-indigo-300">
                <SkipBack size={24} />
              </button>
              {isPlaying ? (
                <button onClick={pauseMusic} className="p-2 text-indigo-400 hover:text-indigo-300">
                  <Pause size={24} />
                </button>
              ) : (
                <button onClick={playMusic} className="p-2 text-indigo-400 hover:text-indigo-300">
                  <Play size={24} />
                </button>
              )}
              <button onClick={skipMusic} className="p-2 text-indigo-400 hover:text-indigo-300">
                <SkipForward size={24} />
              </button>
            </div>
          </div>

          {/* Search for Songs */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search songs..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-[#0F0F13] border border-indigo-500/10 rounded-lg
                       text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2
                       focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Song List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredSongs.map((song, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
                <div>
                  <p className="text-white">{song.title}</p>
                  <p className="text-gray-500">{song.artist}</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentSong(song);
                    setIsPlaying(true);
                  }}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  <Play size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search rooms..."
          className="w-full pl-10 pr-4 py-2 bg-[#0F0F13] border border-indigo-500/10 rounded-lg 
                   text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                   focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="group bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6 
                                    hover:border-indigo-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Hash size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users size={14} />
                    <span>{room.members} members</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              {room.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {room.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[#0A0A0B] rounded-full text-xs text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Music Player */}
            {room.currentSong && (
              <div className="flex items-center justify-between p-3 bg-[#0A0A0B] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Music size={16} className="text-indigo-400" />
                  </div>
                  <div className="text-sm">
                    <p className="text-white">{room.currentSong.title}</p>
                    <p className="text-gray-500">{room.currentSong.artist}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-white">
                  {room.isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            )}

            {/* Join/Leave Button */}
            <button
              onClick={() => {
                if (joinedRoom === room.id) {
                  setJoinedRoom(null);
                  setIsPlaying(false);
                } else {
                  setJoinedRoom(room.id);
                  setCurrentSong(room.currentSong);
                  setIsPlaying(room.isPlaying);
                }
              }}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 mt-4
                         ${joinedRoom === room.id
                           ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                           : 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400'
                         } rounded-lg transition-colors`}>
              <MessageSquare size={16} />
              {joinedRoom === room.id ? 'Leave Room' : 'Join Room'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lounge;