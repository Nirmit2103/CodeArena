import React, { useState } from 'react';

interface Teammate {
  id: string;
  name: string;
  role: string;
  skills: string[];
  experience: string;
  lookingFor: string;
}

const FindTeammates = () => {
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(null);
  const [showModal, setShowModal] = useState(false);

  const teammates: Teammate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'MongoDB'],
      experience: '3 years',
      lookingFor: 'UI/UX Designer & Backend Specialist'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'AI/ML Engineer',
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      experience: '2 years',
      lookingFor: 'Frontend Developer & Data Scientist'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'Mobile Developer',
      skills: ['React Native', 'Swift', 'Firebase'],
      experience: '4 years',
      lookingFor: 'Backend Developer & DevOps'
    },
    {
      id: '4',
      name: 'Alex Martinez',
      role: 'Blockchain Developer',
      skills: ['Solidity', 'Rust', 'Web3.js'],
      experience: '1.5 years',
      lookingFor: 'Smart Contract Auditor & Frontend Dev'
    }
  ];

  const handleConnect = (teammate: Teammate) => {
    setSelectedTeammate(teammate);
    setShowModal(true);
  };

  const confirmConnection = () => {
    // Add actual connection logic here
    console.log('Connecting to:', selectedTeammate?.name);
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Find Teammates for Hackathons</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teammates.map(teammate => (
          <div key={teammate.id} className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <span className="text-indigo-400 text-xl font-medium">
                  {teammate.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{teammate.name}</h3>
                <p className="text-sm text-indigo-400">{teammate.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Skills</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {teammate.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Experience</label>
                <p className="text-white text-sm mt-1">{teammate.experience}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Looking For</label>
                <p className="text-white text-sm mt-1">{teammate.lookingFor}</p>
              </div>

              <button 
                type="button"
                onClick={() => handleConnect(teammate)}
                className="w-full mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-white mb-4">
              Connect with {selectedTeammate?.name}?
            </h3>
            <p className="text-gray-400 mb-6">
              This will send a connection request to {selectedTeammate?.name}. 
              You can include a message below:
            </p>
            
            <textarea
              placeholder="Add a personal message..."
              className="w-full px-4 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                       text-gray-300 placeholder-gray-500 mb-4 min-h-[100px]"
            />
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800/50"
              >
                Cancel
              </button>
              <button
                onClick={confirmConnection}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTeammates; 