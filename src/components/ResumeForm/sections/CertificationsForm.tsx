import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Award } from 'lucide-react';

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Certification>({
    name: '',
    issuer: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCertification = () => {
    const updatedCertifications = [...data, formData];
    onChange(updatedCertifications);
    setFormData({
      name: '',
      issuer: '',
      date: ''
    });
    setIsAdding(false);
  };

  const handleUpdateCertification = () => {
    if (isEditing === null) return;
    
    const updatedCertifications = [...data];
    updatedCertifications[isEditing] = formData;
    onChange(updatedCertifications);
    setIsEditing(null);
    setFormData({
      name: '',
      issuer: '',
      date: ''
    });
  };

  const handleEditCertification = (index: number) => {
    setFormData(data[index]);
    setIsEditing(index);
    setIsAdding(false);
  };

  const handleRemoveCertification = (index: number) => {
    const updatedCertifications = [...data];
    updatedCertifications.splice(index, 1);
    onChange(updatedCertifications);
    
    if (isEditing === index) {
      setIsEditing(null);
      setFormData({
        name: '',
        issuer: '',
        date: ''
      });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      name: '',
      issuer: '',
      date: ''
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
        <h3 className="text-xl font-semibold mb-2">Certifications</h3>
        <p className="text-gray-500 text-sm">
          Add professional certifications that demonstrate your expertise.
        </p>
      </div>

      <AnimatePresence>
        {data.map((certification, index) => (
          <motion.div
            key={`certification-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`mb-4 ${isEditing === index ? 'border-amber-500 ring-1 ring-amber-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 p-2 bg-amber-100 rounded-full">
                      <Award className="h-4 w-4 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">{certification.name}</h4>
                      <p className="text-gray-600">{certification.issuer}</p>
                      {certification.date && (
                        <p className="text-sm text-gray-500">{certification.date}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCertification(index)}
                      className="h-8 px-2"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveCertification(index)}
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
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">
                {isEditing !== null ? 'Edit Certification' : 'Add Certification'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Certification Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., AWS Certified Developer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuing Organization</Label>
                  <Input
                    id="issuer"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleChange}
                    placeholder="e.g., Amazon Web Services"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date Earned</Label>
                  <Input
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="e.g., May 2022"
                  />
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
                  onClick={isEditing !== null ? handleUpdateCertification : handleAddCertification}
                  disabled={!formData.name || !formData.issuer}
                >
                  {isEditing !== null ? 'Update' : 'Add'} Certification
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
          <Plus className="mr-2 h-4 w-4" /> Add Certification
        </Button>
      )}

      {data.length === 0 && !isAdding && (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <Award className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h4 className="text-lg font-medium text-gray-600 mb-1">No certifications added</h4>
          <p className="text-gray-500 mb-4">Add professional certifications to showcase your expertise.</p>
          <Button
            type="button"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Certification
          </Button>
        </div>
      )}
    </motion.div>
  );
}
