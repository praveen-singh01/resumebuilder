const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Check if service account file exists
const serviceAccountPath = path.join(__dirname, '../resumebuilder-bf672-firebase-adminsdk-fbsvc-f57ae9e2a2.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('Error: Firebase service account file not found!');
  console.log('Please make sure the Firebase service account key file is in the root directory.');
  process.exit(1);
}

// Initialize Firebase Admin
const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function setupFirestoreCollections() {
  try {
    console.log('Setting up Firestore collections...');
    console.log('\nIMPORTANT: Before running this script, make sure you have:');
    console.log('1. Created a Firestore database in your Firebase project');
    console.log('2. Selected "Native" mode when creating the database');
    console.log('3. Started in production mode');
    console.log('\nIf you haven\'t done this yet, please:');
    console.log('1. Go to https://console.firebase.google.com/');
    console.log('2. Select your project');
    console.log('3. Go to Firestore Database');
    console.log('4. Click "Create database"');
    console.log('5. Choose "Start in production mode"');
    console.log('6. Select a location close to your users');
    console.log('7. Click "Enable"');
    console.log('\nAfter creating the database, run this script again.\n');

    // 1. Create Templates Collection
    const templatesRef = db.collection('templates');

    try {
      // Add Modern Template
      console.log('Adding Modern template...');
      await templatesRef.doc('modern').set({
        name: 'Modern',
        description: 'A clean, modern design with a professional look',
        thumbnail: 'https://via.placeholder.com/300x400?text=Modern+Template',
        isDefault: true,
        isPremium: false,
        defaultSettings: {
          primaryColor: '#3b82f6',
          secondaryColor: '#6366f1',
          fontFamily: 'Inter'
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('Modern template added successfully!');
    } catch (error) {
      console.error('Error adding Modern template:', error.message);
    }

    try {
      // Add Minimal Template
      console.log('Adding Minimal template...');
      await templatesRef.doc('minimal').set({
        name: 'Minimal',
        description: 'A minimalist design focusing on content',
        thumbnail: 'https://via.placeholder.com/300x400?text=Minimal+Template',
        isDefault: false,
        isPremium: false,
        defaultSettings: {
          primaryColor: '#4b5563',
          secondaryColor: '#6b7280',
          fontFamily: 'Roboto'
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('Minimal template added successfully!');
    } catch (error) {
      console.error('Error adding Minimal template:', error.message);
    }

    try {
      // Add Classic Template
      console.log('Adding Classic template...');
      await templatesRef.doc('classic').set({
        name: 'Classic',
        description: 'A traditional resume layout that works for any industry',
        thumbnail: 'https://via.placeholder.com/300x400?text=Classic+Template',
        isDefault: false,
        isPremium: false,
        defaultSettings: {
          primaryColor: '#1e3a8a',
          secondaryColor: '#3b82f6',
          fontFamily: 'Georgia'
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('Classic template added successfully!');
    } catch (error) {
      console.error('Error adding Classic template:', error.message);
    }

    try {
      // Add Creative Template
      console.log('Adding Creative template...');
      await templatesRef.doc('creative').set({
        name: 'Creative',
        description: 'A bold design for creative professionals',
        thumbnail: 'https://via.placeholder.com/300x400?text=Creative+Template',
        isDefault: false,
        isPremium: true,
        defaultSettings: {
          primaryColor: '#ec4899',
          secondaryColor: '#8b5cf6',
          fontFamily: 'Poppins'
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('Creative template added successfully!');
    } catch (error) {
      console.error('Error adding Creative template:', error.message);
    }

    try {
      // Add Contemporary Template
      console.log('Adding Contemporary template...');
      await templatesRef.doc('contemporary').set({
        name: 'Contemporary',
        description: 'A modern and sophisticated design',
        thumbnail: 'https://via.placeholder.com/300x400?text=Contemporary+Template',
        isDefault: false,
        isPremium: true,
        defaultSettings: {
          primaryColor: '#0f766e',
          secondaryColor: '#0ea5e9',
          fontFamily: 'Montserrat'
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('Contemporary template added successfully!');
    } catch (error) {
      console.error('Error adding Contemporary template:', error.message);
    }

    console.log('Templates collection created successfully!');

    // 2. Set up Firestore Security Rules
    console.log('Note: You will need to set up Firestore Security Rules in the Firebase Console.');
    console.log('Here are the recommended security rules:');
    console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Resumes subcollection - users can only access their own resumes
      match /resumes/{resumeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }

      // Analytics subcollection - users can only write to their own analytics
      match /analytics/{eventId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Templates - all authenticated users can read, only admins can write
    match /templates/{templateId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    // Shared resumes - anyone can read if they have the shareId, only the owner can write
    match /sharedResumes/{shareId} {
      allow read: if true;
      allow write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
    `);

    console.log('Firestore setup completed successfully!');
  } catch (error) {
    console.error('Error setting up Firestore:', error);
  } finally {
    process.exit(0);
  }
}

setupFirestoreCollections();
