import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Globe } from 'lucide-react';

interface Language {
  language: string;
  proficiency: string;
}

interface LanguagesFormProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

const proficiencyLevels = [
  { value: 'Native', label: 'Native' },
  { value: 'Fluent', label: 'Fluent' },
  { value: 'Proficient', label: 'Proficient' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic', label: 'Basic' }
];

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Language>({
    language: '',
    proficiency: 'Proficient'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLanguage = () => {
    const updatedLanguages = [...data, formData];
    onChange(updatedLanguages);
    setFormData({
      language: '',
      proficiency: 'Proficient'
    });
    setIsAdding(false);
  };

  const handleUpdateLanguage = () => {
    if (isEditing === null) return;
    
    const updatedLanguages = [...data];
    updatedLanguages[isEditing] = formData;
    onChange(updatedLanguages);
    setIsEditing(null);
    setFormData({
      language: '',
      proficiency: 'Proficient'
    });
  };

  const handleEditLanguage = (index: number) => {
    setFormData(data[index]);
    setIsEditing(index);
    setIsAdding(false);
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...data];
    updatedLanguages.splice(index, 1);
    onChange(updatedLanguages);
    
    if (isEditing === index) {
      setIsEditing(null);
      setFormData({
        language: '',
        proficiency: 'Proficient'
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      language: '',
      proficiency: 'Proficient'
    });
  };

  // Common language suggestions
  const languageSuggestions = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 
    'Japanese', 'Korean', 'Russian', 'Arabic', 'Portuguese', 
    'Italian', 'Hindi', 'Bengali', 'Dutch', 'Turkish'
  ];

  const addSuggestion = (language: string) => {
    if (!data.some(item => item.language === language)) {
      setFormData({
        language,
        proficiency: 'Proficient'
      });
      setIsAdding(true);
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
        <h3 className="text-xl font-semibold mb-2">Languages</h3>
        <p className="text-gray-500 text-sm">
          Add languages you speak and your proficiency level.
        </p>
      </div>

      <AnimatePresence>
        {data.map((language, index) => (
          <motion.div
            key={`language-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`mb-4 ${isEditing === index ? 'border-green-500 ring-1 ring-green-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 p-2 bg-green-100 rounded-full">
                      <Globe className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">{language.language}</h4>
                      <p className="text-sm text-gray-500">{language.proficiency}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditLanguage(index)}
                      className="h-8 px-2"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveLanguage(index)}
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
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">
                {isEditing !== null ? 'Edit Language' : 'Add Language'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="e.g., Spanish"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proficiency">Proficiency Level</Label>
                  <select
                    id="proficiency"
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
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
                  onClick={isEditing !== null ? handleUpdateLanguage : handleAddLanguage}
                  disabled={!formData.language}
                >
                  {isEditing !== null ? 'Update' : 'Add'} Language
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
          <Plus className="mr-2 h-4 w-4" /> Add Language
        </Button>
      )}

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <Globe className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h4 className="text-lg font-medium text-gray-600 mb-1">No languages added</h4>
          <p className="text-gray-500 mb-4">Add languages you speak to enhance your resume.</p>
          <Button
            type="button"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Language
          </Button>
        </div>
      )}

      {data.length < 3 && !isAdding && isEditing === null && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Common Languages</h4>
          <div className="flex flex-wrap gap-2">
            {languageSuggestions
              .filter(lang => !data.some(item => item.language === lang))
              .slice(0, 8)
              .map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => addSuggestion(language)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  + {language}
                </button>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
