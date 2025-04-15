import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

interface SkillsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    
    const updatedSkills = [...data, newSkill.trim()];
    onChange(updatedSkills);
    setNewSkill('');
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...data];
    updatedSkills.splice(index, 1);
    onChange(updatedSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Common skill suggestions
  const skillSuggestions = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML/CSS',
    'Python', 'Java', 'C#', 'SQL', 'MongoDB',
    'AWS', 'Docker', 'Git', 'Agile', 'Project Management'
  ];

  const addSuggestion = (skill: string) => {
    if (!data.includes(skill)) {
      onChange([...data, skill]);
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
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <p className="text-gray-500 text-sm">
          Add your technical and professional skills. These will be displayed in a dedicated section.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Label htmlFor="newSkill">Add a Skill</Label>
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., JavaScript, Project Management, etc."
            />
          </div>
          <div className="flex items-end">
            <Button 
              type="button" 
              onClick={handleAddSkill}
              disabled={newSkill.trim() === ''}
              className="mb-0.5"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        {data.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <p className="text-gray-500">No skills added yet. Add your first skill above.</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          <AnimatePresence>
            {data.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {data.length < 5 && (
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-2">Suggested Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions
              .filter(skill => !data.includes(skill))
              .slice(0, 10)
              .map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSuggestion(skill)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-md mt-6">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Pro Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
          <li>Include a mix of technical and soft skills</li>
          <li>Prioritize skills mentioned in the job descriptions you're targeting</li>
          <li>Be specific with technical skills (e.g., "React.js" instead of just "JavaScript")</li>
          <li>Aim for 8-12 skills for a balanced resume</li>
        </ul>
      </div>
    </motion.div>
  );
}
