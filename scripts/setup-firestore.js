const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account.json'); // You'll need to create this file

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function setupFirestoreCollections() {
  try {
    console.log('Setting up Firestore collections...');

    // 1. Create Templates Collection
    const templatesRef = db.collection('templates');
    
    // Add Modern Template
    await templatesRef.doc('modern').set({
      name: 'Modern',
      description: 'A clean, modern design with a professional look',
      thumbnail: 'https://example.com/thumbnails/modern.jpg',
      isDefault: true,
      isPremium: false,
      defaultSettings: {
        primaryColor: '#3b82f6',
        secondaryColor: '#6366f1',
        fontFamily: 'Inter'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Add Minimal Template
    await templatesRef.doc('minimal').set({
      name: 'Minimal',
      description: 'A minimalist design focusing on content',
      thumbnail: 'https://example.com/thumbnails/minimal.jpg',
      isDefault: false,
      isPremium: false,
      defaultSettings: {
        primaryColor: '#4b5563',
        secondaryColor: '#6b7280',
        fontFamily: 'Roboto'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Add Classic Template
    await templatesRef.doc('classic').set({
      name: 'Classic',
      description: 'A traditional resume layout that works for any industry',
      thumbnail: 'https://example.com/thumbnails/classic.jpg',
      isDefault: false,
      isPremium: false,
      defaultSettings: {
        primaryColor: '#1e3a8a',
        secondaryColor: '#3b82f6',
        fontFamily: 'Georgia'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Add Creative Template
    await templatesRef.doc('creative').set({
      name: 'Creative',
      description: 'A bold design for creative professionals',
      thumbnail: 'https://example.com/thumbnails/creative.jpg',
      isDefault: false,
      isPremium: true,
      defaultSettings: {
        primaryColor: '#ec4899',
        secondaryColor: '#8b5cf6',
        fontFamily: 'Poppins'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Add Contemporary Template
    await templatesRef.doc('contemporary').set({
      name: 'Contemporary',
      description: 'A modern and sophisticated design',
      thumbnail: 'https://example.com/thumbnails/contemporary.jpg',
      isDefault: false,
      isPremium: true,
      defaultSettings: {
        primaryColor: '#0f766e',
        secondaryColor: '#0ea5e9',
        fontFamily: 'Montserrat'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Templates collection created successfully!');

    // 2. Create Sample User (optional)
    // Uncomment and modify this section if you want to create a sample user
    /*
    const userId = 'sample-user-id'; // Replace with a real user ID after they sign in
    const userRef = db.collection('users').doc(userId);
    
    await userRef.set({
      displayName: 'Sample User',
      email: 'sample@example.com',
      photoURL: 'https://example.com/profile.jpg',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
      settings: {
        theme: 'light',
        defaultTemplate: 'modern'
      }
    });

    // 3. Create Sample Resume for the Sample User
    const resumesRef = userRef.collection('resumes');
    await resumesRef.add({
      name: 'My First Resume',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      templateId: 'modern',
      templateSettings: {
        primaryColor: '#3b82f6',
        secondaryColor: '#6366f1',
        fontFamily: 'Inter'
      },
      data: {
        personal: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '(123) 456-7890',
          location: 'New York, NY',
          summary: 'Experienced software developer with a passion for creating user-friendly applications.',
          linkedinUrl: 'https://linkedin.com/in/johndoe'
        },
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML/CSS'],
        workExperience: [
          {
            company: 'Tech Company',
            position: 'Senior Developer',
            startDate: new Date('2020-01-01'),
            endDate: null, // Current position
            description: 'Leading development of web applications using React and Node.js.'
          },
          {
            company: 'Another Tech Co',
            position: 'Developer',
            startDate: new Date('2018-01-01'),
            endDate: new Date('2019-12-31'),
            description: 'Developed and maintained web applications.'
          }
        ],
        education: [
          {
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: new Date('2014-09-01'),
            endDate: new Date('2018-05-31')
          }
        ],
        projects: [],
        certifications: [],
        languages: []
      }
    });
    */

    console.log('Firestore setup completed successfully!');
  } catch (error) {
    console.error('Error setting up Firestore:', error);
  } finally {
    process.exit(0);
  }
}

setupFirestoreCollections();
