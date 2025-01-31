import React, { useState } from 'react';
import { Plus, Search, Filter, Code2, Users, GitBranch, MessageSquare } from 'lucide-react';
import ProjectForm from './ProjectForm';
import { PROJECT_CATEGORIES } from '../constants/projectCategories';

const Projects = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      id: '1',
      title: 'AI Code Reviewer',
      description: 'An intelligent system that reviews pull requests and suggests improvements using machine learning.',
      category: 'AI/ML',
      tech: ['Python', 'TensorFlow', 'GitHub API'],
      teamSize: 5,
      currentMembers: 3,
      difficulty: 'Advanced',
      status: 'In Progress'
    },
    // Add more project examples...
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Community Projects</h1>
          <p className="text-gray-400 mt-1">Collaborate, learn, and build together</p>
        </div>
        <button 
          onClick={() => setShowProjectForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-[#0F0F13] border border-indigo-500/10 rounded-lg 
                       text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border border-indigo-500/10 rounded-lg p-2 bg-[#0A0A0B]">
            {['All', ...PROJECT_CATEGORIES].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                  ${selectedCategory === category 
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#0F0F13] border border-transparent'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6 
                                       hover:border-indigo-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Code2 size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500">{project.category}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs
                ${project.status === 'In Progress' 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-yellow-500/10 text-yellow-400'}`}>
                {project.status}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-[#0A0A0B] rounded-full text-xs text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-400">
                  <Users size={16} />
                  <span>{project.currentMembers}/{project.teamSize}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <GitBranch size={16} />
                  <span>{project.difficulty}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300">
                <MessageSquare size={16} />
                <span>Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <ProjectForm onClose={() => setShowProjectForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Projects; 