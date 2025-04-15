import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Briefcase } from 'lucide-react';

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<WorkExperience>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      current: checked,
      endDate: checked ? '' : prev.endDate
    }));
  };

  const handleAddExperience = () => {
    const updatedExperiences = [...data, formData];
    onChange(updatedExperiences);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setIsAdding(false);
  };

  const handleUpdateExperience = () => {
    if (isEditing === null) return;
    
    const updatedExperiences = [...data];
    updatedExperiences[isEditing] = formData;
    onChange(updatedExperiences);
    setIsEditing(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleEditExperience = (index: number) => {
    setFormData(data[index]);
    setIsEditing(index);
    setIsAdding(false);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = [...data];
    updatedExperiences.splice(index, 1);
    onChange(updatedExperiences);
    
    if (isEditing === index) {
      setIsEditing(null);
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
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
        <h3 className="text-xl font-semibold mb-2">Work Experience</h3>
        <p className="text-gray-500 text-sm">
          Add your relevant work experience, starting with the most recent position.
        </p>
      </div>

      <AnimatePresence>
        {data.map((experience, index) => (
          <motion.div
            key={`experience-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`mb-4 ${isEditing === index ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 p-2 bg-blue-100 rounded-full">
                      <Briefcase className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">{experience.position}</h4>
                      <p className="text-gray-600">{experience.company}</p>
                      <p className="text-sm text-gray-500">
                        {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                      </p>
                      <p className="text-sm mt-2">{experience.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditExperience(index)}
                      className="h-8 px-2"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveExperience(index)}
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
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">
                {isEditing !== null ? 'Edit Experience' : 'Add Experience'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="e.g., Jan 2020"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    placeholder="e.g., Dec 2022"
                    disabled={formData.current}
                  />
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id="current"
                      checked={formData.current}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <Label htmlFor="current" className="text-sm cursor-pointer">
                      I currently work here
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use bullet points and action verbs. Focus on achievements and quantifiable results.
                </p>
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
                  onClick={isEditing !== null ? handleUpdateExperience : handleAddExperience}
                  disabled={!formData.company || !formData.position || !formData.startDate}
                >
                  {isEditing !== null ? 'Update' : 'Add'} Experience
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
          <Plus className="mr-2 h-4 w-4" /> Add Work Experience
        </Button>
      )}

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h4 className="text-lg font-medium text-gray-600 mb-1">No work experience added</h4>
          <p className="text-gray-500 mb-4">Add your professional experience to make your resume stand out.</p>
          <Button
            type="button"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </div>
      )}
    </motion.div>
  );
}
