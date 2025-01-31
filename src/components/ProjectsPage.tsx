import { useState } from 'react';
import ProjectForm from './ProjectForm';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  teamSize: number;
  difficulty: string;
}

const ProjectsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'AI Chat Assistant',
      description: 'Build a conversational AI using TensorFlow',
      category: 'AI/ML',
      tech: ['Python', 'TensorFlow', 'NLTK'],
      teamSize: 3,
      difficulty: 'Advanced'
    },
    {
      id: '2',
      title: 'E-Commerce Platform',
      description: 'Full-stack shopping site with React & Node.js',
      category: 'Web Development',
      tech: ['React', 'Node.js', 'MongoDB'],
      teamSize: 4,
      difficulty: 'Intermediate'
    },
    {
      id: '3',
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform fitness app with React Native',
      category: 'Mobile Apps',
      tech: ['React Native', 'Firebase', 'TypeScript'],
      teamSize: 2,
      difficulty: 'Intermediate'
    },
    {
      id: '4',
      title: 'Blockchain Voting System',
      description: 'Decentralized voting platform using Ethereum',
      category: 'Blockchain',
      tech: ['Solidity', 'React', 'Web3.js'],
      teamSize: 3,
      difficulty: 'Advanced'
    },
    {
      id: '5',
      title: 'Game Engine Development',
      description: 'Low-level game engine with C++ and OpenGL',
      category: 'Game Development',
      tech: ['C++', 'OpenGL', 'CMake'],
      teamSize: 5,
      difficulty: 'Advanced'
    }
  ]);

  const handleCreateProject = (newProject: Omit<Project, 'id'>) => {
    setProjects(prev => [
      ...prev,
      {
        ...newProject,
        id: Date.now().toString()
      }
    ]);
  };

  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech.some(tech => tech.toLowerCase().includes(query)) ||
      project.category.toLowerCase().includes(query) ||
      project.difficulty.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 p-6">
      {/* Search and Create Button */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-[#0F0F13] border border-indigo-500/10 rounded-lg 
                     text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
        >
          Create New Project
        </button>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No projects found</p>
          <p className="text-sm">Try adjusting your search or create a new project</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6">
              <h3 className="text-lg font-medium text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Team: {project.teamSize}</span>
                <span>Difficulty: {project.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm 
          onClose={() => setShowForm(false)}
          onCreateProject={(newProject) => {
            setProjects(prev => [...prev, { ...newProject, id: Date.now().toString() }]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ProjectsPage; 