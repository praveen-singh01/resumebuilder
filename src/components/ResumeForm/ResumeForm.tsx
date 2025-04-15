import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from '@/components/ui/sparkles';
import { ResumeData } from '@/types/resume';
import PersonalInfoForm from './sections/PersonalInfoForm';
import SkillsForm from './sections/SkillsForm';
import WorkExperienceForm from './sections/WorkExperienceForm';
import EducationForm from './sections/EducationForm';
import ProjectsForm from './sections/ProjectsForm';
import CertificationsForm from './sections/CertificationsForm';
import LanguagesForm from './sections/LanguagesForm';
import { ArrowLeft, ArrowRight, Download, Eye } from 'lucide-react';

interface ResumeFormProps {
  initialData: ResumeData;
  onPreview: (data: ResumeData) => void;
  onDownload: (data: ResumeData) => void;
}

const sections = [
  { id: 'personal', label: 'Personal' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languages', label: 'Languages' },
];

export default function ResumeForm({ initialData, onPreview, onDownload }: ResumeFormProps) {
  const [formData, setFormData] = useState<ResumeData>(initialData);
  const [activeSection, setActiveSection] = useState('personal');
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Mark sections as completed when initialData is provided
  useEffect(() => {
    console.log('ResumeForm received initialData:', JSON.stringify(initialData));
    const completedSections = [];

    // Check personal section
    if (initialData.personal && (
      initialData.personal.name ||
      initialData.personal.email ||
      initialData.personal.phone ||
      initialData.personal.location ||
      initialData.personal.summary
    )) {
      completedSections.push('personal');
    }

    // Check skills section
    if (initialData.skills && initialData.skills.length > 0) {
      completedSections.push('skills');
    }

    // Check experience section
    if (initialData.workExperience && initialData.workExperience.length > 0) {
      completedSections.push('experience');
    }

    // Check education section
    if (initialData.education && initialData.education.length > 0) {
      completedSections.push('education');
    }

    // Check projects section
    if (initialData.projects && initialData.projects.length > 0) {
      completedSections.push('projects');
    }

    // Check certifications section
    if (initialData.certifications && initialData.certifications.length > 0) {
      completedSections.push('certifications');
    }

    // Check languages section
    if (initialData.languages && initialData.languages.length > 0) {
      completedSections.push('languages');
    }

    console.log('Marking sections as completed:', completedSections);
    setCompletedSections(completedSections);
    setFormData(initialData);
  }, [initialData]);

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));

    if (!completedSections.includes(section)) {
      setCompletedSections(prev => [...prev, section]);
    }
  };

  const handleNext = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const isFirstSection = activeSection === sections[0].id;
  const isLastSection = activeSection === sections[sections.length - 1].id;
  const currentSectionIndex = sections.findIndex(section => section.id === activeSection);
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Sparkles>
        <Card className="w-full shadow-lg border-0">
          <CardContent className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">Build Your Resume</h2>
                <span className="text-sm text-gray-500">
                  Step {currentSectionIndex + 1} of {sections.length}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
              <TabsList className="grid grid-cols-7 mb-8">
                {sections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className={`relative ${completedSections.includes(section.id) ? 'text-green-600' : ''}`}
                  >
                    {section.label}
                    {completedSections.includes(section.id) && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <PersonalInfoForm
                  data={formData.personal}
                  onChange={(data) => updateFormData('personal', data)}
                />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillsForm
                  data={formData.skills}
                  onChange={(data) => updateFormData('skills', data)}
                />
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <WorkExperienceForm
                  data={formData.workExperience}
                  onChange={(data) => updateFormData('workExperience', data)}
                />
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <EducationForm
                  data={formData.education}
                  onChange={(data) => updateFormData('education', data)}
                />
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <ProjectsForm
                  data={formData.projects}
                  onChange={(data) => updateFormData('projects', data)}
                />
              </TabsContent>

              <TabsContent value="certifications" className="mt-6">
                <CertificationsForm
                  data={formData.certifications}
                  onChange={(data) => updateFormData('certifications', data)}
                />
              </TabsContent>

              <TabsContent value="languages" className="mt-6">
                <LanguagesForm
                  data={formData.languages}
                  onChange={(data) => updateFormData('languages', data)}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstSection}
                className={isFirstSection ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => onPreview(formData)}
                  className="bg-white hover:bg-gray-50"
                >
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>

                <Button
                  variant="outline"
                  onClick={() => onDownload(formData)}
                  className="bg-white hover:bg-gray-50"
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>

              {isLastSection ? (
                <Button
                  variant="gradient"
                  onClick={() => onDownload(formData)}
                >
                  Finish & Download <Download className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  onClick={handleNext}
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Sparkles>
    </div>
  );
}
