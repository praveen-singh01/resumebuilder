"use client";

import dynamic from 'next/dynamic';
import { ResumeData } from '@/types/resume';

// Import react-pdf components dynamically
const { Document, Page, Text, View, StyleSheet } = {
  Document: dynamic(() => import('@react-pdf/renderer').then(mod => mod.Document), { ssr: false }),
  Page: dynamic(() => import('@react-pdf/renderer').then(mod => mod.Page), { ssr: false }),
  Text: dynamic(() => import('@react-pdf/renderer').then(mod => mod.Text), { ssr: false }),
  View: dynamic(() => import('@react-pdf/renderer').then(mod => mod.View), { ssr: false }),
  StyleSheet: { create: (styles: any) => styles }
};

interface PDFDocumentProps {
  resumeData: ResumeData;
  templateId: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 10,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skill: {
    fontSize: 10,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
});

export default function PDFDocument({
  resumeData,
  templateId,
  primaryColor,
  secondaryColor,
  fontFamily
}: PDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={styles.header}>{resumeData.personal.name}</Text>
          <View style={styles.row}>
            {resumeData.personal.email && (
              <Text style={styles.text}>{resumeData.personal.email}</Text>
            )}
            {resumeData.personal.phone && (
              <Text style={styles.text}>{resumeData.personal.phone}</Text>
            )}
          </View>
          {resumeData.personal.linkedinUrl && (
            <Text style={styles.text}>{resumeData.personal.linkedinUrl}</Text>
          )}
          {resumeData.personal.summary && (
            <Text style={styles.text}>{resumeData.personal.summary}</Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Skills</Text>
          <View style={styles.skills}>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Work Experience</Text>
          {resumeData.workExperience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.row}>
                <Text style={[styles.text, styles.bold]}>{exp.company}</Text>
                <Text style={styles.text}>
                  {exp.startDate} – {exp.current ? "Present" : exp.endDate || "N/A"}
                </Text>
              </View>
              <Text style={[styles.text, { fontStyle: 'italic' }]}>{exp.position}</Text>
              <Text style={styles.text}>{exp.description}</Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Education</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.row}>
                <Text style={[styles.text, styles.bold]}>{edu.institution}</Text>
                <Text style={styles.text}>
                  {edu.startDate} – {edu.current ? "Present" : edu.endDate || "N/A"}
                </Text>
              </View>
              <Text style={styles.text}>{edu.degree} in {edu.field}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        {(resumeData.projects || []).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Projects</Text>
            {(resumeData.projects || []).map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.text, styles.bold]}>{project.name}</Text>
                <Text style={styles.text}>{project.description}</Text>
                {project.technologies && (
                  <Text style={[styles.text, { fontStyle: 'italic' }]}>
                    Technologies: {project.technologies.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {(resumeData.certifications || []).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Certifications</Text>
            {(resumeData.certifications || []).map((cert, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.bold]}>{cert.name}</Text>
                  <Text style={styles.text}>{cert.date}</Text>
                </View>
                <Text style={styles.text}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {(resumeData.languages || []).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Languages</Text>
            {(resumeData.languages || []).map((lang, index) => (
              <Text key={index} style={styles.text}>
                {lang.language} - {lang.proficiency}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
