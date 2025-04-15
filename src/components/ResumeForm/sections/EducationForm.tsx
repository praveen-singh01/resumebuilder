import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, GraduationCap } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Education>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEducation = () => {
    const updatedEducation = [...data, formData];
    onChange(updatedEducation);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    });
    setIsAdding(false);
  };

  const handleUpdateEducation = () => {
    if (isEditing === null) return;
    
    const updatedEducation = [...data];
    updatedEducation[isEditing] = formData;
    onChange(updatedEducation);
    setIsEditing(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleEditEducation = (index: number) => {
    setFormData(data[index]);
    setIsEditing(index);
    setIsAdding(false);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...data];
    updatedEducation.splice(index, 1);
    onChange(updatedEducation);
    
    if (isEditing === index) {
      setIsEditing(null);
      setFormData({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
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
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <p className="text-gray-500 text-sm">
          Add your educational background, starting with the most recent degree.
        </p>
      </div>

      <AnimatePresence>
        {data.map((education, index) => (
          <motion.div
            key={`education-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`mb-4 ${isEditing === index ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 p-2 bg-indigo-100 rounded-full">
                      <GraduationCap className="h-4 w-4 text-indigo-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">{education.degree}{education.field ? ` in ${education.field}` : ''}</h4>
                      <p className="text-gray-600">{education.institution}</p>
                      <p className="text-sm text-gray-500">
                        {education.startDate} - {education.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEducation(index)}
                      className="h-8 px-2"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveEducation(index)}
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
          <Card className="border-indigo-200 bg-indigo-50/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">
                {isEditing !== null ? 'Edit Education' : 'Add Education'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="University or School Name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g., Bachelor of Science"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Year</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      placeholder="e.g., 2016"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Year</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      placeholder="e.g., 2020"
                    />
                  </div>
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
                  onClick={isEditing !== null ? handleUpdateEducation : handleAddEducation}
                  disabled={!formData.institution || !formData.degree || !formData.startDate}
                >
                  {isEditing !== null ? 'Update' : 'Add'} Education
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
          <Plus className="mr-2 h-4 w-4" /> Add Education
        </Button>
      )}

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h4 className="text-lg font-medium text-gray-600 mb-1">No education added</h4>
          <p className="text-gray-500 mb-4">Add your educational background to enhance your resume.</p>
          <Button
            type="button"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>
      )}
    </motion.div>
  );
}
