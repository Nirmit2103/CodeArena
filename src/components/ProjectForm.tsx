import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../constants/projectCategories';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  teamSize: number;
  difficulty: string;
}

interface ProjectFormProps {
  onClose: () => void;
  onCreateProject: (project: Omit<Project, 'id'>) => void;
}

const ProjectForm = ({ onClose, onCreateProject }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tech: [] as string[],
    teamSize: 1,
    difficulty: 'Intermediate',
    newTech: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add form validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    onCreateProject({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tech: formData.tech,
      teamSize: formData.teamSize,
      difficulty: formData.difficulty
    });
    
    // Reset form state
    setFormData({
      title: '',
      description: '',
      category: '',
      tech: [],
      teamSize: 1,
      difficulty: 'Intermediate',
      newTech: ''
    });
    
    onClose();
  };

  const addTech = () => {
    if (formData.newTech.trim() && !formData.tech.includes(formData.newTech.trim())) {
      setFormData({
        ...formData,
        tech: [...formData.tech, formData.newTech.trim()],
        newTech: ''
      });
    }
  };

  const removeTech = (techToRemove: string) => {
    setFormData({
      ...formData,
      tech: formData.tech.filter(tech => tech !== techToRemove)
    });
  };

  return (
    <div className="bg-[#0F0F13] rounded-lg border border-indigo-500/10 p-6 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Create New Project</h2>
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800/50"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Project Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                     text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter project title"
            required
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                     text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:border-transparent h-32"
            placeholder="Describe your project"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                     text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent"
            required
          >
            <option value="">Select category</option>
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={formData.newTech}
              onChange={(e) => setFormData({ ...formData, newTech: e.target.value })}
              className="flex-1 px-4 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                       text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500 focus:border-transparent"
              placeholder="Add technology"
            />
            <button
              type="button"
              onClick={addTech}
              className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 
                       rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm 
                         flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Team Size
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.teamSize}
            onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                     text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Difficulty
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="w-full px-4 py-2 bg-[#0A0A0B] border border-indigo-500/10 rounded-lg 
                     text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800/50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg 
                     transition-colors"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 