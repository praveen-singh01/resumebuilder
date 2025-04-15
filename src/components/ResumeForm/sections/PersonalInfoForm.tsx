import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedinUrl: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
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
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p className="text-gray-500 text-sm">
          This information will appear at the top of your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="City, State"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input
            id="linkedinUrl"
            name="linkedinUrl"
            value={data.linkedinUrl}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={data.summary}
          onChange={handleChange}
          placeholder="A brief summary of your professional background and career goals..."
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-1">
          Keep your summary concise and impactful. Aim for 2-4 sentences that highlight your expertise and value.
        </p>
      </div>
    </motion.div>
  );
}
