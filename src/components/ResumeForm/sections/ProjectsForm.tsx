import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Code, X } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project>({
    name: '',
    description: '',
    technologies: []
  });
  const [technology, setTechnology] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTechnology = () => {
    if (technology.trim() === '') return;
    if (formData.technologies.includes(technology.trim())) return;
    
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, technology.trim()]
    }));
    setTechnology('');
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleAddProject = () => {
    const updatedProjects = [...data, formData];
    onChange(updatedProjects);
    setFormData({
      name: '',
      description: '',
      technologies: []
    });
    setIsAdding(false);
  };

  const handleUpdateProject = () => {
    if (isEditing === null) return;
    
    const updatedProjects = [...data];
    updatedProjects[isEditing] = formData;
    onChange(updatedProjects);
    setIsEditing(null);
    setFormData({
      name: '',
      description: '',
      technologies: []
    });
  };

  const handleEditProject = (index: number) => {
    setFormData(data[index]);
    setIsEditing(index);
    setIsAdding(false);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...data];
    updatedProjects.splice(index, 1);
    onChange(updatedProjects);
    
    if (isEditing === index) {
      setIsEditing(null);
      setFormData({
        name: '',
        description: '',
        technologies: []
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      name: '',
      description: '',
      technologies: []
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        <p className="text-gray-500 text-sm">
          Add notable projects that showcase your skills and achievements.
        </p>
      </div>

      <AnimatePresence>
        {data.map((project, index) => (
          <motion.div
            key={`project-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`mb-4 ${isEditing === index ? 'border-purple-500 ring-1 ring-purple-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 p-2 bg-purple-100 rounded-full">
                      <Code className="h-4 w-4 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm mt-1">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={`tech-${index}-${techIndex}`}
                              className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(index)}
                      className="h-8 px-2"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveProject(index)}
                      className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {(isAdding || isEditing !== null) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">
                {isEditing !== null ? 'Edit Project' : 'Add Project'}
              </h4>
              
              <div className="space-y-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., E-commerce Website"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the project, your role, and its impact..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technology">Technologies Used</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="technology"
                      value={technology}
                      onChange={(e) => setTechnology(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g., React, Node.js"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTechnology}
                      disabled={technology.trim() === ''}
                      className="shrink-0"
                    >
                      Add
                    </Button>
                  </div>
                  
                  {formData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.technologies.map((tech, techIndex) => (
                        <div
                          key={`form-tech-${techIndex}`}
                          className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center text-sm"
                        >
                          <span>{tech}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTechnology(tech)}
                            className="ml-1 text-purple-600 hover:text-purple-800 focus:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={isEditing !== null ? handleUpdateProject : handleAddProject}
                  disabled={!formData.name || !formData.description}
                >
                  {isEditing !== null ? 'Update' : 'Add'} Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {!isAdding && isEditing === null && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full py-6 border-dashed"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      )}

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <Code className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h4 className="text-lg font-medium text-gray-600 mb-1">No projects added</h4>
          <p className="text-gray-500 mb-4">Showcase your skills by adding relevant projects.</p>
          <Button
            type="button"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      )}
    </motion.div>
  );
}
