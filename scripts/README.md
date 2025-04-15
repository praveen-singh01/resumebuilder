# Firestore Setup Scripts

This directory contains scripts to set up your Firebase Firestore database structure.

## Setting Up Your Firestore Database

### Step 1: Get Firebase Service Account Credentials

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service accounts
4. Click "Generate new private key"
5. Save the downloaded JSON file as `firebase-service-account.json` in the root directory of this project

### Step 2: Install Dependencies

```bash
npm install firebase-admin
```

### Step 3: Run the Setup Script

```bash
node scripts/init-firestore.js
```

This script will:
1. Create the templates collection with predefined templates
2. Display recommended security rules for your Firestore database

### Step 4: Set Up Security Rules

Copy the security rules displayed in the console output and paste them into the Firestore Rules section in the Firebase Console.

## Database Structure

The script sets up the following collections:

1. **templates**: Contains predefined resume templates
   - modern
   - minimal
   - classic
   - creative
   - contemporary

2. **users/{userId}**: Will be created automatically when users sign in
   - **resumes/{resumeId}**: Subcollection for each user's resumes
   - **analytics/{eventId}**: Subcollection for tracking user activity

3. **sharedResumes/{shareId}**: For publicly shared resumes

## Customizing the Setup

You can modify the `init-firestore.js` script to add more templates or change the default settings.
